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

const DIRNAME = path.dirname(fileURLToPath(import.meta.url))
const TMP = path.join(DIRNAME, '../.tmp')
const BENCH_IMGS = path.join(DIRNAME, '../results', 'img')

const LIMIT_RUNS = 30

const fixtures = [
  'react-app',
  'ember-quickstart',
  'angular-quickstart',
  'medium-size-app',
  'alotta-files',
]

const tests = [
  'firstInstall',
  'repeatInstall',
  'withWarmCacheAndLockfile',
  'withWarmCache',
  'withLockfile',
  'withWarmCacheAndModules',
  'withWarmModulesAndLockfile',
  'withWarmModules',
  'updatedDependencies'
]

const testDescriptions = [
  [ // firstInstall
    'clean install'
  ],
  [ // repeatInstall
    'with cache',
    'with lockfile',
    'with node_modules'
  ],
  [ // withWarmCacheAndLockfile
    'with cache',
    'with lockfile'
  ],
  [ // withWarmCache
    'with cache'
  ],
  [ // withLockfile
    'with lockfile'
  ],
  [ // withWarmCacheAndModules
    'with cache',
    'with node_modules'
  ],
  [ // withWarmModulesAndLockfile
    'with node_modules',
    'with lockfile'
  ],
  [ // withWarmModules
    'with node_modules'
  ],
  [ // updatedDependencies
    'update'
  ]
]

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
  .catch(err => console.error(err))

function verifyPackageManager (name, cwd = undefined) {
  const opts = { stdio: 'pipe' }
  if (cwd) opts.cwd = cwd
  const result = spawn.sync(name, ['--version'], opts)
  if (result.status !== 0) {
    throw new Error(`✗ ${name} is not available or failed to run`)
  }
  const version = result.stdout.toString().trim()
  console.log(`✓ ${name}: ${version}`)
  return version
}

async function run () {
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
    writePackageJson(managersDir),
    writePackageJson(managersDirClassic),
    writePackageJson(managersDirPnpmRust),
  ])

  // Setup specialized package managers
  spawn.sync('pnpm', ['add', 'npm@latest', 'pnpm@latest'], { cwd: managersDir, stdio: 'inherit' })
  spawn.sync('pnpm', ['add', '@pnpm/exe@latest'], { cwd: managersDirPnpmRust, stdio: 'inherit' })
  spawn.sync('yarn', ['set', 'version', 'stable'], { cwd: managersDir, stdio: 'inherit' })
  spawn.sync('pnpm', ['add', 'yarn@^1'], { cwd: managersDirClassic, stdio: 'inherit' })

  // Verify all package managers
  console.log('\n📦 Verifying required package managers...\n')
  verifyPackageManager('npm')
  verifyPackageManager('pnpm')
  verifyPackageManager('yarn')
  verifyPackageManager('bun')
  console.log('\n  Specialized variants:')
  verifyPackageManager('pnpm', managersDirPnpmRust)
  verifyPackageManager('yarn', managersDirClassic)
  verifyPackageManager('yarn', managersDir)
  console.log('\n✓ All required package managers are available\n')
  const formattedNow = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date())
  const pms = [ 'npm', 'pnpm', 'pnpm_rust', 'yarn', 'yarn_pnp', 'yarn_classic', 'bun' ]
  const svgs = []
  const opts = {
    limitRuns: LIMIT_RUNS,
    hasNodeModules: true,
    managersDir,
  }
  for (const fixture of fixtures) {
    const npmRes = min(await benchmark(cmdsMap.npm, fixture, opts))
    const yarnRes = min(await benchmark(cmdsMap.yarn, fixture, opts))
    const yarnPnPRes = min(await benchmark(cmdsMap.yarn_pnp, fixture, {
      ...opts,
      hasNodeModules: false,
    }))
    const yarnClassicRes = min(await benchmark(cmdsMap.yarn_classic, fixture, {
      ...opts,
      managersDir: managersDirClassic,
    }))
    const bunRes = min(await benchmark(cmdsMap.bun, fixture, opts))
    const pnpmRes = min(await benchmark(cmdsMap.pnpm, fixture, opts))
    const pnpmRustRes = min(await benchmark(cmdsMap.pnpm_rust, fixture, {
      ...opts,
      managersDir: managersDirPnpmRust,
    }))
    const resArray = toArray(pms, {
      'npm': npmRes,
      'pnpm': pnpmRes,
      'pnpm_rust': pnpmRustRes,
      'yarn': yarnRes,
      'yarn_pnp': yarnPnPRes,
      'yarn_classic': yarnClassicRes,
      'bun': bunRes,
    })

    svgs.push({
      path: path.join(BENCH_IMGS, `${fixture}.svg`),
      file: generateSvg(resArray, [cmdsMap.npm, cmdsMap.pnpm, cmdsMap.pnpm_rust, cmdsMap.yarn, cmdsMap.yarn_pnp, cmdsMap.yarn_classic, cmdsMap.bun], testDescriptions, formattedNow)
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
