import { spawn } from 'node:child_process'

export async function action(command: string, cwd: string) {
  return new Promise<void>((resolve, reject) => {
    const [cmd, ...args] = command.split(' ')

    const child = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    })

    const onCleanup = () => { child.kill('SIGHUP') }

    process.on('exit', onCleanup)

    child.on('close', (code) => {
      process.removeListener('exit', onCleanup)

      if (code === 0) resolve()
      else reject(new Error(`Command failed. \n Command: ${command} \n Code: ${code}`))
    })
  })
}
