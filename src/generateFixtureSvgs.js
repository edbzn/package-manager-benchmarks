import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { loadYamlFile } from 'load-yaml-file'
import { rcompare, valid as validSemver } from 'semver'
import cmdsMap from './commandsMap.js'
import generateSvg from './generateSvg.js'

const DIRNAME = path.dirname(fileURLToPath(import.meta.url))
const RESULTS_DIR = path.join(DIRNAME, '../results')
const BENCH_IMGS = path.join(RESULTS_DIR, 'img')

const PMS = ['npm', 'pnpm', 'pnpm_rust', 'yarn', 'yarn_pnp', 'yarn_classic', 'bun']
const FIXTURES = ['alotta-files', 'angular-quickstart', 'ember-quickstart', 'react-app', 'medium-size-app']

const tests = [
  'firstInstall',
  'repeatInstall',
  'withWarmCacheAndLockfile',
  'withWarmCache',
  'withLockfile',
  'withWarmCacheAndModules',
  'withWarmModulesAndLockfile',
  'withWarmModules',
  'updatedDependencies',
]

const testDescriptions = [
  ['clean install'],
  ['with cache', 'with lockfile', 'with node_modules'],
  ['with cache', 'with lockfile'],
  ['with cache'],
  ['with lockfile'],
  ['with cache', 'with node_modules'],
  ['with node_modules', 'with lockfile'],
  ['with node_modules'],
  ['update'],
]

const emptyResult = Object.fromEntries(tests.map((test) => [test, NaN]))

const compareVersions = (a, b) => {
  const aValid = validSemver(a)
  const bValid = validSemver(b)

  if (aValid && bValid) return rcompare(a, b)
  if (aValid) return -1
  if (bValid) return 1

  return b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' })
}

const min = (benchmarkResults) => {
  const results = {}
  tests.forEach((test) => {
    results[test] = Math.min.apply(Math, benchmarkResults.map((res) => res[test]))
  })

  return results
}

const toArray = (resultsObj) => {
  return tests.map((test) =>
    PMS.map((pm) => resultsObj[pm][test]).map((time) =>
      Number.isFinite(time) ? Math.round(time / 100) / 10 : NaN
    )
  )
}

const getLatestFixtureResult = async (pm, fixture) => {
  const pmDir = path.join(RESULTS_DIR, pm)
  if (!fs.existsSync(pmDir)) {
    return {
      pm,
      version: 'n/a',
      result: emptyResult,
    }
  }

  const versions = fs
    .readdirSync(pmDir)
    .sort(compareVersions)

  for (const version of versions) {
    const fixtureResultPath = path.join(pmDir, version, `${fixture}.yaml`)
    if (!fs.existsSync(fixtureResultPath)) continue

    const benchmarkResults = await loadYamlFile(fixtureResultPath)

    return {
      pm,
      version,
      result: min(benchmarkResults),
    }
  }

  return {
    pm,
    version: versions[0] || 'n/a',
    result: emptyResult,
  }
}

run().catch((err) => {
  console.error(err)
  process.exitCode = 1
})

async function run () {
  await fs.promises.mkdir(BENCH_IMGS, { recursive: true })

  const formattedNow = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date())

  for (const fixture of FIXTURES) {
    const latestResults = await Promise.all(PMS.map((pm) => getLatestFixtureResult(pm, fixture)))

    const pmResultMap = {}
    const pmsWithVersions = []

    latestResults.forEach(({ pm, version, result }) => {
      pmResultMap[pm] = result
      pmsWithVersions.push({
        ...cmdsMap[pm],
        version,
      })
    })

    const svg = generateSvg(toArray(pmResultMap), pmsWithVersions, testDescriptions, formattedNow)

    await fs.promises.writeFile(path.join(BENCH_IMGS, `${fixture}.svg`), svg, 'utf8')
  }
}
