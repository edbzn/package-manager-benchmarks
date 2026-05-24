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

const METRICS = [
  {
    key: 'durationSeconds',
    requiresTelemetry: false,
    fileSuffix: '',
    chartTitleForFixture: (fixture) => fixture === 'alotta-files'
      ? 'A lot of files benchmark'
      : `${fixture} benchmark`,
    chartSubtitleForFixture: (fixture) => fixture === 'alotta-files'
      ? 'Latest available versions across install scenarios (lower is better)'
      : 'Latest available versions across install scenarios',
    read: (entry, test) => entry?.[test],
    normalize: (value) => Number.isFinite(value) ? Math.round((value / 1000) * 10) / 10 : NaN,
  },
  {
    key: 'memoryMb',
    requiresTelemetry: true,
    fileSuffix: '-memory',
    chartTitleForFixture: (fixture) => fixture === 'alotta-files'
      ? 'A lot of files benchmark (peak memory)'
      : `${fixture} benchmark (peak memory)`,
    chartSubtitleForFixture: () => 'Peak RSS in MB (GNU time, lower is generally better)',
    read: (entry, test) => entry?.installMetrics?.[test]?.maxRssKb,
    normalize: (value) => Number.isFinite(value) ? Math.round((value / 1024) * 10) / 10 : NaN,
  },
  {
    key: 'cpuPercent',
    requiresTelemetry: true,
    fileSuffix: '-cpu',
    chartTitleForFixture: (fixture) => fixture === 'alotta-files'
      ? 'A lot of files benchmark (CPU usage)'
      : `${fixture} benchmark (CPU usage)`,
    chartSubtitleForFixture: () => 'Process CPU utilization in % (GNU time)',
    read: (entry, test) => entry?.installMetrics?.[test]?.cpuPercent,
    normalize: (value) => Number.isFinite(value) ? Math.round(value * 10) / 10 : NaN,
  },
  {
    key: 'ioOps',
    requiresTelemetry: true,
    fileSuffix: '-iops',
    chartTitleForFixture: (fixture) => fixture === 'alotta-files'
      ? 'A lot of files benchmark (disk I/O)'
      : `${fixture} benchmark (disk I/O)`,
    chartSubtitleForFixture: () => 'Filesystem I/O operations (%I + %O, GNU time, lower is generally better)',
    read: (entry, test) => {
      const fsInputs = entry?.installMetrics?.[test]?.fsInputs
      const fsOutputs = entry?.installMetrics?.[test]?.fsOutputs
      if (!Number.isFinite(fsInputs) || !Number.isFinite(fsOutputs)) return NaN
      return fsInputs + fsOutputs
    },
    normalize: (value) => Number.isFinite(value) ? Math.round(value) : NaN,
  },
]

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

const aggregateBestResult = (benchmarkResults) => {
  const fallback = {
    ...emptyResult,
    installMetrics: {},
  }

  if (!Array.isArray(benchmarkResults) || benchmarkResults.length === 0) return fallback

  const best = min(benchmarkResults)
  const installMetrics = {}

  tests.forEach((test) => {
    const validRuns = benchmarkResults.filter((run) => Number.isFinite(run?.[test]))
    if (validRuns.length === 0) return

    const fastest = validRuns.reduce((currentBest, current) => {
      if (!currentBest) return current
      return current[test] < currentBest[test] ? current : currentBest
    }, null)

    const runsWithMetrics = validRuns.filter((run) => {
      const metricEntry = run?.installMetrics?.[test]
      if (!metricEntry || typeof metricEntry !== 'object') return false
      return Object.values(metricEntry).some((value) => Number.isFinite(value))
    })

    const fastestWithMetrics = runsWithMetrics.reduce((currentBest, current) => {
      if (!currentBest) return current
      return current[test] < currentBest[test] ? current : currentBest
    }, null)

    const candidateMetrics = fastestWithMetrics?.installMetrics?.[test] || fastest?.installMetrics?.[test]
    if (candidateMetrics && Object.values(candidateMetrics).some((value) => Number.isFinite(value))) {
      installMetrics[test] = candidateMetrics
    }
  })

  return {
    ...best,
    installMetrics,
  }
}

const toArray = (resultsObj, metric) => {
  return tests.map((test) =>
    PMS.map((pm) => metric.read(resultsObj[pm], test)).map((value) =>
      metric.normalize(value)
    )
  )
}

const isCompleteNumericResult = (result) => tests.every((test) => Number.isFinite(result[test]))

const hasMetricData = (result, metric) => {
  if (!metric.requiresTelemetry) return true
  return tests.some((test) => Number.isFinite(metric.read(result, test)))
}

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

      const result = aggregateBestResult(benchmarkResults)
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

const getLatestFixtureResultForMetric = async (pm, fixture, metric) => {
  if (!metric.requiresTelemetry) {
    return getLatestFixtureResult(pm, fixture)
  }

  const pmDir = path.join(RESULTS_DIR, pm)
  if (!fs.existsSync(pmDir)) {
    return {
      pm,
      version: 'n/a',
      result: emptyResult,
    }
  }

  const versions = getCandidateVersions(pm, pmDir)

  for (const version of versions) {
    const fixtureResultPath = path.join(pmDir, version, `${fixture}.yaml`)
    if (!fs.existsSync(fixtureResultPath)) continue

    try {
      const benchmarkResults = await loadYamlFile(fixtureResultPath)
      if (!Array.isArray(benchmarkResults) || benchmarkResults.length === 0) continue

      const result = aggregateBestResult(benchmarkResults)
      if (hasMetricData(result, metric)) {
        return { pm, version, result }
      }
    } catch {
      continue
    }
  }

  // If nothing has telemetry for this metric yet, keep duration-based fallback.
  return getLatestFixtureResult(pm, fixture)
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
    const durationMetric = METRICS[0]
    const latestResults = await Promise.all(PMS.map((pm) => getLatestFixtureResultForMetric(pm, fixture, durationMetric)))

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
      toArray(pmResultMap, durationMetric),
      pmsWithVersions,
      testDescriptions,
      formattedNow,
      chartTitle,
      chartSubtitle
    )

    await fs.promises.writeFile(path.join(BENCH_IMGS, `${fixture}.svg`), svg, 'utf8')

    for (const metric of METRICS.slice(1)) {
      const metricLatestResults = await Promise.all(PMS.map((pm) => getLatestFixtureResultForMetric(pm, fixture, metric)))
      const metricPmResultMap = {}
      const metricPmsWithVersions = []

      metricLatestResults.forEach(({ pm, version, result }) => {
        metricPmResultMap[pm] = result
        metricPmsWithVersions.push({
          ...cmdsMap[pm],
          version,
        })
      })

      const metricSvg = generateSvg(
        toArray(metricPmResultMap, metric),
        metricPmsWithVersions,
        testDescriptions,
        formattedNow,
        metric.chartTitleForFixture(fixture),
        metric.chartSubtitleForFixture(fixture)
      )
      await fs.promises.writeFile(path.join(BENCH_IMGS, `${fixture}${metric.fileSuffix}.svg`), metricSvg, 'utf8')
    }
  }
}
