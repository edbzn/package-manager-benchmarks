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

  pm.version = getPMVersion(pm.name, opts)
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

function getPMVersion (pmName, opts) {
  const env = createEnv(opts.managersDir)
  env.COREPACK_ENABLE_STRICT = '0'
  const versionCwd = path.dirname(opts.managersDir)

  // For pacquet, use a clean home directory to avoid inheriting parent config
  if (pmName === 'pacquet') {
    env.PNPM_HOME = opts.managersDir
    env.NPM_CONFIG_USERCONFIG = path.join(opts.managersDir, '.npmrc')
  }

  const { status, stdout, stderr } = spawn.sync(pmName, ['--version'], {
    // Use a neutral cwd so package-manager strict checks from managersDir
    // (e.g. packageManager: yarn) do not block pnpm version lookup.
    cwd: versionCwd,
    env,
    stdio: ['pipe', 'pipe', 'pipe'], // Capture stderr separately
  })
  if (status !== 0) {
    // For pacquet, try reading version from package.json as fallback
    if (pmName === 'pacquet') {
      try {
        const pkgJsonPath = path.join(opts.managersDir, 'node_modules', 'pacquet', 'package.json')
        const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'))
        return pkgJson.version
      } catch (e) {
        // Fall through to error below
      }
    }
    throw new Error(`Couldn't detect version of ${pmName}. ${stderr?.toString()}`)
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
