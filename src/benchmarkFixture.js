'use strict'
import path from 'path'
import pathKey from 'path-key'
import spawn from "cross-spawn"
import fsx from 'fs-extra'
import { promises as fs, readFileSync } from 'fs'
import getFolderSize from 'get-folder-size'
import rimraf from 'rimraf'
import { fileURLToPath } from 'url'

const DIRNAME = path.dirname(fileURLToPath(import.meta.url))

const FIXTURES_DIR = path.join(DIRNAME, '../fixtures')
const TMP = path.join(DIRNAME, '../.tmp')

const lockfileNameByPM = {
  npm: 'package-lock.json',
  pnpm: 'pnpm-lock.yaml',
  yarn: 'yarn.lock',
  bun: 'bun.lockb',
}

const GNU_TIME_BINARY_CANDIDATES = ['/usr/bin/time', 'gtime']
const GNU_TIME_MARKER = '__BENCH_STATS__'

function parseNumberOrNaN (value) {
  if (typeof value !== 'string' && typeof value !== 'number') return NaN
  const normalized = String(value)
    .trim()
    .replace('%', '')
    .replace(',', '.')
  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : NaN
}

function detectGnuTimeBinary (env, cwd) {
  for (const binary of GNU_TIME_BINARY_CANDIDATES) {
    const result = spawn.sync(binary, ['--version'], {
      env,
      cwd,
      stdio: 'pipe',
    })
    if (result.status === 0) {
      const stdout = result.stdout ? result.stdout.toString() : ''
      const stderr = result.stderr ? result.stderr.toString() : ''
      const output = `${stdout}\n${stderr}`
      if (output.toLowerCase().includes('gnu time')) {
        return binary
      }
    }
  }

  return null
}

function parseGnuTimeLine (line) {
  const prefix = `${GNU_TIME_MARKER}|`
  if (!line.startsWith(prefix)) return null

  const [, rssKbRaw, cpuPercentRaw, fsInputsRaw, fsOutputsRaw] = line.split('|')
  return {
    maxRssKb: parseNumberOrNaN(rssKbRaw),
    cpuPercent: parseNumberOrNaN(cpuPercentRaw),
    fsInputs: parseNumberOrNaN(fsInputsRaw),
    fsOutputs: parseNumberOrNaN(fsOutputsRaw),
  }
}

function readTimingMetricsFromResult (result) {
  const stderr = result.stderr ? result.stderr.toString() : ''
  const lines = stderr.split(/\r?\n/)
  for (let index = lines.length - 1; index >= 0; index--) {
    const parsed = parseGnuTimeLine(lines[index])
    if (parsed) return parsed
  }

  return null
}

export function createEnv (managersDir) {
  const pathEnv = pathKey()
  const env = Object.create(process.env)
  env[pathEnv] = [
    path.join(managersDir, 'node_modules/.bin'),
    path.dirname(process.execPath),
    process.env[pathEnv]
  ].join(path.delimiter)
  return env
}

function cleanLockfile (pm, cwd, env) {
  const lockfileName = lockfileNameByPM[pm.name.includes('bun') ? 'bun' : pm.name]
  rimraf.sync(path.join(cwd, lockfileName))
  if (pm.name === 'yarn' && pm.scenario !== 'yarn_classic') {
    // This ensures yarn berry to install under a nested folder
    spawnSyncOrThrow({ name: 'nodetouch', args: [lockfileName] }, { env, cwd, stdio: "inherit" })
  }
}

async function updateDependenciesInPackageJson (cwd) {
  const packageJsonPath = path.join(cwd, 'package.json')
  const buf = await fs.readFile(packageJsonPath)
  const originalAsString = buf.toString()
  const parsed = JSON.parse(originalAsString)

  // set all dependency versions to '*'
  Object.keys(parsed).forEach((key) => {
    if (key.toLowerCase().includes('dependencies')) {
      Object.keys(parsed[key]).forEach((dependency) => {
        parsed[key][dependency] = '*'
      })
    }
  })

  const modifiedAsString = JSON.stringify(parsed)
  await fs.writeFile(packageJsonPath, modifiedAsString)

  // return the original file so that we can replace it when done
  return originalAsString
}

export default async function benchmark (pm, fixture, opts) {
  const env = createEnv(opts.managersDir)
  const gnuTimeBinary = detectGnuTimeBinary(env, path.dirname(process.execPath))
  const cwd = path.join(TMP, pm.scenario, fixture)
  fsx.copySync(path.join(FIXTURES_DIR, fixture), cwd)

  if (pm.scenario === 'pnpm_rust') {
    // Activate the Rust install engine: pnpm 11.2+ delegates fetch/link to
    // the pacquet binary when @pnpm/pacquet is listed in configDependencies.
    const pacquetPkgJson = path.join(opts.managersDir, 'node_modules', '.pnpm-config', '@pnpm', 'pacquet', 'package.json')
    const { version: pacquetVersion } = JSON.parse(readFileSync(pacquetPkgJson, 'utf-8'))
    await fs.writeFile(
      path.join(cwd, 'pnpm-workspace.yaml'),
      `configDependencies:\n  '@pnpm/pacquet': '${pacquetVersion}'\n`
    )
  }
  const modules = opts.hasNodeModules ? path.join(cwd, 'node_modules') : null

  cleanLockfile(pm, cwd, env)

  if (pm.name === 'yarn' && pm.scenario !== 'yarn_classic') {
    // Disable global mirror that speeds up yarn berry install
    let yarnRc =
      'enableImmutableInstalls: false\n'
    + 'enableMirror: false\n'
    + `cacheFolder: ${path.join(cwd, 'cache')}\n`
    + 'enableScripts: false\n'
    /**
     * @see https://yarnpkg.com/configuration/yarnrc#nodeLinker
     */
    switch (pm.scenario) {
      case 'yarn':
        yarnRc += 'nodeLinker: node-modules\n'
                + 'nmMode: hardlinks-local\n'
                + 'compressionLevel: 0\n'
        break
      case 'yarn_pnp':
        yarnRc += 'nodeLinker: pnp\n'
        break
    }
    await fs.writeFile(path.join(cwd, '.yarnrc.yml'), yarnRc)
  }

  console.log(`# first install`)

  const firstInstallStats = measureInstall(pm, cwd, env, gnuTimeBinary)
  const firstInstall = firstInstallStats.durationMs

  let repeatInstall
  let repeatInstallStats
  if (modules) {
    console.log(`# repeat install`)

    repeatInstallStats = measureInstall(pm, cwd, env, gnuTimeBinary)
    repeatInstall = repeatInstallStats.durationMs

    rimraf.sync(modules)
  } else {
    repeatInstall = 0
    repeatInstallStats = null
  }

  console.log(`# with warm cache and lockfile`)

  const withWarmCacheAndLockfileStats = measureInstall(pm, cwd, env, gnuTimeBinary)
  const withWarmCacheAndLockfile = withWarmCacheAndLockfileStats.durationMs

  if (modules) {
    rimraf.sync(modules)
  }

  cleanLockfile(pm, cwd)

  console.log('# with warm cache')

  const withWarmCacheStats = measureInstall(pm, cwd, env, gnuTimeBinary)
  const withWarmCache = withWarmCacheStats.durationMs

  if (modules) {
    rimraf.sync(modules)
  }
  rimraf.sync(path.join(cwd, 'cache'))

  console.log('# with lockfile')

  const withLockfileStats = measureInstall(pm, cwd, env, gnuTimeBinary)
  const withLockfile = withLockfileStats.durationMs

  cleanLockfile(pm, cwd)

  let withWarmCacheAndModules
  let withWarmModulesAndLockfile
  let withWarmModules
  let withWarmCacheAndModulesStats
  let withWarmModulesAndLockfileStats
  let withWarmModulesStats
  let size
  if (modules) {
    console.log('# with warm cache and modules')

    withWarmCacheAndModulesStats = measureInstall(pm, cwd, env, gnuTimeBinary)
    withWarmCacheAndModules = withWarmCacheAndModulesStats.durationMs

    rimraf.sync(path.join(cwd, 'cache'))

    console.log('# with warm modules and lockfile')

    withWarmModulesAndLockfileStats = measureInstall(pm, cwd, env, gnuTimeBinary)
    withWarmModulesAndLockfile = withWarmModulesAndLockfileStats.durationMs

    rimraf.sync(path.join(cwd, 'cache'))
    cleanLockfile(pm, cwd)

    console.log('# with warm modules')

    withWarmModulesStats = measureInstall(pm, cwd, env, gnuTimeBinary)
    withWarmModules = withWarmModulesStats.durationMs

    size = await getFolderSize(modules).size
  } else {
    withWarmCacheAndModules =
      withWarmModulesAndLockfile =
      withWarmModules = 0
    withWarmCacheAndModulesStats =
      withWarmModulesAndLockfileStats =
      withWarmModulesStats = null
    size = await getFolderSize(path.join(cwd, 'cache')).size
  }

  console.log('# with updated dependencies')

  // update all dependency versions to '*' and install again
  const originalPackageJson = await updateDependenciesInPackageJson(cwd)
  if (pm.name === 'pnpm') {
    // This is needed to fix pnpm execution on CI
    pm = {
      ...pm,
      args: [...pm.args, '--no-frozen-lockfile'],
    }
  }
  const updatedDependenciesStats = measureInstall(pm, cwd, env, gnuTimeBinary)
  const updatedDependencies = updatedDependenciesStats.durationMs

  // revert `package.json` back to its original state, just in case
  await fs.writeFile(path.join(cwd, 'package.json'), originalPackageJson)

  rimraf.sync(cwd)

  const installMetrics = {
    firstInstall: firstInstallStats,
    repeatInstall: repeatInstallStats,
    withWarmCacheAndLockfile: withWarmCacheAndLockfileStats,
    withWarmCache: withWarmCacheStats,
    withLockfile: withLockfileStats,
    withWarmCacheAndModules: withWarmCacheAndModulesStats,
    withWarmModulesAndLockfile: withWarmModulesAndLockfileStats,
    withWarmModules: withWarmModulesStats,
    updatedDependencies: updatedDependenciesStats,
  }

  return {
    firstInstall,
    repeatInstall,
    withWarmCacheAndLockfile,
    withWarmCache,
    withLockfile,
    withWarmCacheAndModules,
    withWarmModulesAndLockfile,
    withWarmModules,
    updatedDependencies,
    installMetrics,
    size
  }
}

function measureInstall (cmd, cwd, env, gnuTimeBinary) {
  const startTime = Date.now()

  console.log(`> ${cmd.name} ${cmd.args.join(' ')}`)
  let metrics = null

  if (gnuTimeBinary) {
    const metricFormat = `${GNU_TIME_MARKER}|%M|%P|%I|%O`
    const shellCommand = [
      JSON.stringify(gnuTimeBinary),
      '-f',
      JSON.stringify(metricFormat),
      JSON.stringify(cmd.name),
      ...cmd.args.map((arg) => JSON.stringify(arg)),
    ].join(' ')

    const timed = spawn.sync('sh', ['-lc', shellCommand], {
      env,
      cwd,
      stdio: ['inherit', 'inherit', 'pipe'],
    })

    const stderr = timed.stderr ? timed.stderr.toString() : ''
    if (stderr) process.stderr.write(stderr)
    if (timed.status !== 0) {
      throw new Error(`'${cmd.name}' failed with status ${timed.status}`)
    }
    metrics = readTimingMetricsFromResult(timed)
  } else {
    spawnSyncOrThrow(cmd, { env, cwd, stdio: "inherit" })
  }

  const endTime = Date.now()

  return {
    durationMs: endTime - startTime,
    maxRssKb: metrics?.maxRssKb ?? NaN,
    cpuPercent: metrics?.cpuPercent ?? NaN,
    fsInputs: metrics?.fsInputs ?? NaN,
    fsOutputs: metrics?.fsOutputs ?? NaN,
  }
}

function spawnSyncOrThrow (cmd, opts) {
  const result = spawn.sync(cmd.name, cmd.args, opts);
  if (result.status !== 0) {
    throw new Error(`${cmd.name} failed with status code ${result.status}`)
  }
  return result;
}
