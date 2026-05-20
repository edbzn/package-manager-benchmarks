export default {
  npm: {
    scenario: 'npm',
    legend: 'npm',
    name: 'npm',
    args: [
      'install',
      '--no-fund',
      '--no-audit',
      '--ignore-scripts',
      '--cache=cache',
      '--registry=https://registry.npmjs.org/',
      '--legacy-peer-deps',
    ]
  },
  pnpm: {
    scenario: 'pnpm',
    legend: 'pnpm',
    name: 'pnpm',
    args: [
      'install',
      '--ignore-scripts',
      '--store-dir=cache/store',
      '--cache-dir=cache/cache',
      '--registry=https://registry.npmjs.org/',
      '--no-strict-peer-dependencies',
      '--config.auto-install-peers=false',
      '--config.resolution-mode=highest',
    ]
  },
  yarn: {
    scenario: 'yarn',
    legend: 'Yarn',
    name: 'yarn',
    args: [
      'install'
    ]
  },
  yarn_pnp: {
    scenario: 'yarn_pnp',
    legend: 'Yarn PnP',
    name: 'yarn',
    args: [
      'install'
    ]
  },
  yarn_classic: {
    scenario: 'yarn_classic',
    legend: 'Yarn Classic',
    name: 'yarn',
    args: [
      'install',
      '--ignore-scripts',
      '--cache-folder=cache',
      '--registry=https://registry.npmjs.org/',
      '--non-interactive',
    ]
  },
  bun: {
    scenario: 'bun',
    legend: 'Bun',
    name: 'bun',
    args: [
      'install'
    ]
  },
}
