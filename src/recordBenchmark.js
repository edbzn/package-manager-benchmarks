'use strict'
import spawn from 'cross-spawn'
import benchmark, { createEnv } from './benchmarkFixture.js'
import path from 'path'
import writeYamlFile from 'write-yaml-file'
import { loadYamlFile } from 'load-yaml-file'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'

const DIRNAME = path.dirname(fileURLToPath(import.meta.url))
const RESULTS = path.join(DIRNAME, '../results')

export default async function (pm, fixture, opts) {
  opts = opts || {}
  const limitRuns = opts.limitRuns || Infinity

  pm.version = getPMVersion(pm, opts)
  const resultsFile = path.join(RESULTS, pm.scenario, pm.version, `${fixture}.yaml`)
  const prevResults = await safeLoadYamlFile(resultsFile) || []

  if (prevResults.length >= limitRuns) return prevResults

  const newResults = await benchmark(pm, fixture, {
    hasNodeModules: opts.hasNodeModules,
    managersDir: opts.managersDir,
  })
  const results = [...prevResults, newResults]
  await writeYamlFile(resultsFile, results)
  return results
}

function getPMVersion (pm, opts) {
  // For pnpm_rust, report the @pnpm/pacquet package version rather than the
  // pnpm binary version (which would be identical to the regular pnpm entry).
  if (pm.scenario === 'pnpm_rust') {
    const pkgJsonPath = path.join(opts.managersDir, 'node_modules', '.pnpm-config', '@pnpm', 'pacquet', 'package.json')
    try {
      const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'))
      return pkgJson.version
    } catch (e) {
      throw new Error(`Couldn't read @pnpm/pacquet version from ${pkgJsonPath}: ${e.message}`)
    }
  }

  const env = createEnv(opts.managersDir)
  env.COREPACK_ENABLE_STRICT = '0'
  const versionCwd = path.dirname(opts.managersDir)

  const { status, stdout, stderr } = spawn.sync(pm.name, ['--version'], {
    // Use a neutral cwd so package-manager strict checks from managersDir
    // (e.g. packageManager: yarn) do not block pnpm version lookup.
    cwd: versionCwd,
    env,
    stdio: ['pipe', 'pipe', 'pipe'],
  })
  if (status !== 0) {
    throw new Error(`Couldn't detect version of ${pm.name}. ${stderr?.toString()}`)
  }
  return stdout.toString().trim()
}

async function safeLoadYamlFile (filename) {
  try {
    return await loadYamlFile(filename)
  } catch (err) {
    if (err.code !== 'ENOENT') throw err
    return null
  }
}
