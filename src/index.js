'use strict'

import fs from 'fs'
import rimraf from 'rimraf'
import tempy from 'tempy'
import cmdsMap from './commandsMap.js'
import benchmark from './recordBenchmark.js'
import generateSvg from './generateSvg.js'
import spawn from "cross-spawn"
import path from 'path'
import { fileURLToPath } from 'url'
import pathKey from 'path-key'
import { coerce as coerceSemver } from 'semver'
import { pms as PMS, fixtures, tests, testDescriptions } from './config.js'

const DIRNAME = path.dirname(fileURLToPath(import.meta.url))
const TMP = path.join(DIRNAME, '../.tmp')
const BENCH_IMGS = path.join(DIRNAME, '../results', 'img')

const LIMIT_RUNS = 30

const PM_ARG_PREFIX = '--pm='



const toArray = (pms, resultsObj) => {
  /**
   * Make array of all similar installs grouped together:
   * [
   *   [ npm.firstInstall, yarn.firstInstall, pnpm.firstInstall ],
   *   [ npm.repeatInstall, yarn.repeatInstall, pnpm.repeatInstall ],
   *   ...
   * ]
   */
  return tests
    .map((test) => pms
      .map((pm) => resultsObj[pm][test])
      .map((time) => Math.round(time / 100) / 10) // round to `x.x` seconds
    )
}

run()
  .then(() => console.log('done'))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

function verifyPackageManager (name, cwd = undefined, binDir = undefined) {
  const opts = { stdio: 'pipe' }
  if (cwd) {
    const env = { ...process.env }
    const key = pathKey()
    const binPath = binDir ? path.join(binDir, 'node_modules/.bin') : path.join(cwd, 'node_modules/.bin')
    env[key] = [
      binPath,
      process.env[key],
    ].filter(Boolean).join(path.delimiter)
    opts.cwd = cwd
    opts.env = env
  }
  const result = spawn.sync(name, ['--version'], opts)
  if (result.status !== 0) {
    const stderr = result.stderr ? result.stderr.toString().trim() : ''
    throw new Error(`✗ ${name} is not available or failed to run${stderr ? `: ${stderr}` : ''}`)
  }
  const version = result.stdout.toString().trim()
  console.log(`✓ ${name}: ${version}`)
  return version
}

function assertExpectedMajorVersion (name, version, expectedMajor) {
  const major = Number(version.split('.')[0])
  if (!Number.isInteger(major)) {
    throw new Error(`✗ ${name}: expected major ${expectedMajor}, got invalid version "${version}"`)
  }
  if (major !== expectedMajor) {
    throw new Error(`✗ ${name}: expected major ${expectedMajor}, got ${version}`)
  }
  console.log(`✓ ${name}: matches expected major ${expectedMajor}`)
}

function assertSemverLikeVersion (name, version) {
  const coerced = coerceSemver(version)
  if (!coerced) {
    throw new Error(`✗ ${name}: expected a semver-like version, got ${version}`)
  }
  console.log(`✓ ${name}: version format looks valid (${coerced.version})`)
}

async function verifyInstallations (managersDirClassic, managersDirPnpmRust, { needsClassicManagers, needsPnpmRustManagers }) {
  console.log('\n✓ Verifying specialized package managers are installed...\n')

  if (needsPnpmRustManagers) {
    // Check pacquet config installation
    const pacquetPath = path.join(managersDirPnpmRust, 'node_modules', '.pnpm-config', '@pnpm', 'pacquet')
    if (!fs.existsSync(pacquetPath)) {
      throw new Error(`✗ @pnpm/pacquet config is not installed in ${managersDirPnpmRust}`)
    }
    const pnpmRustBinPath = path.join(managersDirPnpmRust, 'node_modules', '.bin', 'pnpm')
    if (!fs.existsSync(pnpmRustBinPath)) {
      throw new Error(`✗ pnpm binary is missing in ${managersDirPnpmRust}/node_modules/.bin`)
    }
    console.log('✓ @pnpm/pacquet config is installed')
  }

  if (needsClassicManagers) {
    // Check yarn@^1 installation
    const yarnClassicPath = path.join(managersDirClassic, 'node_modules', 'yarn')
    if (!fs.existsSync(yarnClassicPath)) {
      throw new Error(`✗ yarn@^1 is not installed in ${managersDirClassic}`)
    }
    const yarnClassicBinPath = path.join(managersDirClassic, 'node_modules', '.bin', 'yarn')
    if (!fs.existsSync(yarnClassicBinPath)) {
      throw new Error(`✗ yarn@^1 binary is missing in ${managersDirClassic}/node_modules/.bin`)
    }
    console.log('✓ yarn@^1 is installed')
  }
}

function getSelectedPackageManagers () {
  const selectedFromArgv = process.argv
    .slice(2)
    .filter((arg) => arg.startsWith(PM_ARG_PREFIX))
    .flatMap((arg) => arg.slice(PM_ARG_PREFIX.length).split(','))

  // `pnpm run benchmark --pm=pnpm_rust` exposes `pm` as npm config env.
  // This keeps script ergonomics while still allowing explicit CLI args.
  const selectedFromEnv = (process.env.npm_config_pm || '')
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean)

  // npm can map `--pm=...` to `npm_config_message` on some versions.
  const selectedFromMessage = (process.env.npm_config_message || '')
    .split(',')
    .map((name) => name.trim())
    .filter((name) => PMS.includes(name))

  const selectedFromNpmConfigArgv = (() => {
    const raw = process.env.npm_config_argv
    if (!raw) return []

    try {
      const parsed = JSON.parse(raw)
      const values = []
      const args = [...(parsed.original || []), ...(parsed.cooked || [])]
      args.forEach((arg) => {
        if (typeof arg === 'string' && arg.startsWith(PM_ARG_PREFIX)) {
          values.push(...arg.slice(PM_ARG_PREFIX.length).split(','))
        }
      })
      return values.map((name) => name.trim()).filter(Boolean)
    } catch {
      return []
    }
  })()

  const selectedFromArgs = [
    ...selectedFromArgv,
    ...selectedFromEnv,
    ...selectedFromMessage,
    ...selectedFromNpmConfigArgv,
  ]
    .map((name) => name.trim())
    .filter(Boolean)

  if (selectedFromArgs.length === 0) return PMS

  const uniqueSelected = [...new Set(selectedFromArgs)]
  const invalid = uniqueSelected.filter((name) => !PMS.includes(name))
  if (invalid.length > 0) {
    throw new Error(`✗ Unknown package manager(s): ${invalid.join(', ')}. Valid values: ${PMS.join(', ')}`)
  }

  // Keep the default order so chart colors and legends remain predictable.
  return PMS.filter((name) => uniqueSelected.includes(name))
}

function managerDirFor (pmName, dirs) {
  if (pmName === 'pnpm_rust') return dirs.managersDirPnpmRust
  if (pmName === 'yarn_classic') return dirs.managersDirClassic
  return dirs.managersDir
}

function runOrThrow (name, args, opts) {
  const result = spawn.sync(name, args, opts)
  if (result.status !== 0) {
    throw new Error(`✗ ${name} ${args.join(' ')} failed with status ${result.status}`)
  }
}

async function run () {
  const selectedPms = getSelectedPackageManagers()
  const needsGeneralManagers = selectedPms.some((pm) => ['npm', 'pnpm', 'yarn', 'yarn_pnp', 'bun'].includes(pm))
  const needsClassicManagers = selectedPms.includes('yarn_classic')
  const needsPnpmRustManagers = selectedPms.includes('pnpm_rust')

  const managersDir = path.join(tempy.directory(), 'managers')
  const managersDirClassic = path.join(tempy.directory(), 'managers-classic')
  const managersDirPnpmRust = path.join(tempy.directory(), 'managers-pnpm-rust')

  await Promise.allSettled([
    rimraf(TMP),
    // make sure folders exist
    fs.promises.mkdir(managersDir, { recursive: true }),
    fs.promises.mkdir(managersDirClassic, { recursive: true }),
    fs.promises.mkdir(managersDirPnpmRust, { recursive: true }),
    fs.promises.mkdir(BENCH_IMGS, { recursive: true }),
  ])
  await Promise.all([
    needsGeneralManagers ? writePackageJson(managersDir) : Promise.resolve(),
    needsClassicManagers ? writePackageJson(managersDirClassic) : Promise.resolve(),
    needsPnpmRustManagers ? writePackageJson(managersDirPnpmRust) : Promise.resolve(),
  ])

  // Setup specialized package managers
  if (needsGeneralManagers) {
    runOrThrow('pnpm', ['add', 'npm@latest', 'pnpm@latest', '--ignore-scripts', '--config.strict-dep-builds=false'], { cwd: managersDir, stdio: 'inherit' })
    // Yarn Berry is only needed for yarn/yarn_pnp scenarios.
    if (selectedPms.some((pm) => pm === 'yarn' || pm === 'yarn_pnp')) {
      runOrThrow('yarn', ['set', 'version', 'stable'], { cwd: managersDir, stdio: 'inherit' })
    }
  }
  if (needsPnpmRustManagers) {
    runOrThrow('pnpm', ['add', 'pnpm@latest', '--ignore-scripts', '--config.strict-dep-builds=false'], { cwd: managersDirPnpmRust, stdio: 'inherit' })
    runOrThrow('pnpm', ['add', '@pnpm/pacquet', '--config', '--ignore-scripts', '--config.strict-dep-builds=false'], { cwd: managersDirPnpmRust, stdio: 'inherit' })
  }
  if (needsClassicManagers) {
    runOrThrow('pnpm', ['add', 'yarn@^1', '--ignore-scripts', '--config.strict-dep-builds=false'], { cwd: managersDirClassic, stdio: 'inherit' })
  }

  // Verify installations before running benchmarks
  if (needsClassicManagers || needsPnpmRustManagers) {
    await verifyInstallations(managersDirClassic, managersDirPnpmRust, {
      needsClassicManagers,
      needsPnpmRustManagers,
    })
  }

  // Verify all package managers
  console.log('\n📦 Verifying required package managers...\n')
  const pmVersions = {}
  selectedPms.forEach((pm) => {
    if (pm === 'pnpm_rust') {
      pmVersions.pnpm_rust = verifyPackageManager('pnpm', path.dirname(managersDirPnpmRust), managersDirPnpmRust)
      return
    }

    if (pm === 'yarn_classic') {
      pmVersions.yarn_classic = verifyPackageManager('yarn', path.dirname(managersDirClassic), managersDirClassic)
      return
    }

    if (pm === 'yarn' || pm === 'yarn_pnp') {
      pmVersions[pm] = verifyPackageManager('yarn', path.dirname(managersDir), managersDir)
      return
    }

    pmVersions[pm] = verifyPackageManager(cmdsMap[pm].name)
  })

  console.log('\n  Variant major checks:')
  if (pmVersions.pnpm_rust) {
    assertSemverLikeVersion('pnpm_rust (pacquet)', pmVersions.pnpm_rust)
  }
  if (pmVersions.yarn_classic) {
    assertExpectedMajorVersion('yarn_classic', pmVersions.yarn_classic, 1)
  }
  console.log('\n✓ All required package managers are available\n')

  console.log(`\n▶ Running benchmarks for: ${selectedPms.join(', ')}\n`)
  const formattedNow = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date())
  const pms = selectedPms
  const svgs = []
  for (const fixture of fixtures) {
    const resultsByPm = {}
    for (const pmName of pms) {
      const hasNodeModules = pmName !== 'yarn_pnp'
      const managerDirs = { managersDir, managersDirClassic, managersDirPnpmRust }
      const pmOpts = {
        limitRuns: LIMIT_RUNS,
        hasNodeModules,
        managersDir: managerDirFor(pmName, managerDirs),
      }
      resultsByPm[pmName] = min(await benchmark(cmdsMap[pmName], fixture, pmOpts))
    }
    const resArray = toArray(pms, resultsByPm)

    svgs.push({
      path: path.join(BENCH_IMGS, `${fixture}.svg`),
      file: generateSvg(resArray, pms.map((pmName) => cmdsMap[pmName]), testDescriptions, formattedNow)
    })
  }
  await Promise.all(svgs.map((file) => fs.promises.writeFile(file.path, file.file, 'utf-8')))
}

async function writePackageJson (cwd) {
  await fs.promises.writeFile(path.join(cwd, 'package.json'), JSON.stringify({
    private: true,
  }), 'utf8')
}

function min (benchmarkResults) {
  const results = {}
  tests.forEach(test => {
    results[test] = Math.min.apply(Math, benchmarkResults.map(res => res[test]))
  })

  return results
}
