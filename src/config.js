export const pms = ['npm', 'pnpm', 'pnpm_rust', 'yarn', 'yarn_pnp', 'yarn_classic', 'bun']

export const fixtures = ['alotta-files']

export const tests = [
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

// Multi-line labels for fixture comparison SVGs
export const testDescriptions = [
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

// Single-line labels for per-PM version delta SVGs
export const testDescriptionsFlat = [
  'clean install',
  'cache + lockfile + node_modules',
  'cache + lockfile',
  'cache',
  'lockfile',
  'cache + node_modules',
  'node_modules + lockfile',
  'node_modules',
  'update',
]
