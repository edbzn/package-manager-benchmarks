import spawn from 'cross-spawn'

const forwardedArgs = process.argv.slice(2)

function runOrThrow (name, args, extraEnv = undefined) {
  const result = spawn.sync(name, args, {
    stdio: 'inherit',
    env: extraEnv ? { ...process.env, ...extraEnv } : process.env,
  })

  if (result.status !== 0) {
    process.exit(result.status || 1)
  }
}

runOrThrow('node', ['./src/index.js', ...forwardedArgs], { COREPACK_ENABLE_STRICT: '0' })
runOrThrow('pnpm', ['run', 'update-charts', ...forwardedArgs])
