import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { loadYamlFile } from 'load-yaml-file'
import { rcompare, valid as validSemver } from 'semver'
import cmdsMap from './commandsMap.js'
import generateSvg from './generateSvg.js'
import { pms as PMS, fixtures as FIXTURES, tests, testDescriptions } from './config.js'

const DIRNAME = path.dirname(fileURLToPath(import.meta.url))
const RESULTS_DIR = path.join(DIRNAME, '../results')
const BENCH_IMGS = path.join(RESULTS_DIR, 'img')

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

const isCompleteNumericResult = (result) => tests.every((test) => Number.isFinite(result[test]))

const getCandidateVersions = (pm, pmDir) => {
  let versions = fs
    .readdirSync(pmDir)
    .sort(compareVersions)

  if (pm === 'pnpm_rust') {
    const pnpmDir = path.join(RESULTS_DIR, 'pnpm')
    if (fs.existsSync(pnpmDir)) {
      const pnpmVersions = new Set(fs.readdirSync(pnpmDir))
      const pacquetLikeVersions = versions.filter((version) => !pnpmVersions.has(version))
      // Filter stale pnpm-version folders from pnpm_rust when dedicated
      // pacquet-version folders are available.
      if (pacquetLikeVersions.length > 0) {
        versions = pacquetLikeVersions
      }
    }
  }

  return versions
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

  const versions = getCandidateVersions(pm, pmDir)

  let fallback = null

  for (const version of versions) {
    const fixtureResultPath = path.join(pmDir, version, `${fixture}.yaml`)
    if (!fs.existsSync(fixtureResultPath)) continue

    try {
      const benchmarkResults = await loadYamlFile(fixtureResultPath)
      if (!Array.isArray(benchmarkResults) || benchmarkResults.length === 0) continue

      const result = min(benchmarkResults)
      const current = { pm, version, result }

      if (isCompleteNumericResult(result)) {
        return current
      }

      // Keep most recent partial data as a fallback if no complete result exists.
      if (!fallback) fallback = current
    } catch {
      // Skip unreadable/invalid YAML and try older versions.
      continue
    }
  }

  if (fallback) return fallback

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

    const chartTitle = fixture === 'alotta-files'
      ? 'A lot of files benchmark'
      : `${fixture} benchmark`

    const chartSubtitle = fixture === 'alotta-files'
      ? 'Latest available versions across install scenarios (lower is better)'
      : 'Latest available versions across install scenarios'

    const svg = generateSvg(
      toArray(pmResultMap),
      pmsWithVersions,
      testDescriptions,
      formattedNow,
      chartTitle,
      chartSubtitle
    )

    await fs.promises.writeFile(path.join(BENCH_IMGS, `${fixture}.svg`), svg, 'utf8')
  }
}
