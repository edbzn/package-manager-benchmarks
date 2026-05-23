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
      '--config.strict-dep-builds=false',
      '--store-dir=cache/store',
      '--cache-dir=cache/cache',
      '--registry=https://registry.npmjs.org/',
      '--no-strict-peer-dependencies',
      '--config.auto-install-peers=false',
      '--config.resolution-mode=highest',
    ]
  },
  pnpm_rust: {
    scenario: 'pnpm_rust',
    legend: 'pnpm (pacquet)',
    name: 'pnpm',
    args: [
      'install',
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
      'install',
      '--cache-dir=cache',
    ]
  },
}
