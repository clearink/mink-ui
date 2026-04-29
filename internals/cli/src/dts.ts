import { realpathSync } from 'node:fs'
import path from 'node:path'

import { remove, rename } from 'fs-extra'

import { action } from './utils/action'

async function main() {
  const cwd = realpathSync(process.cwd())

  await action('tsc -b ./tsconfig.build.json', cwd)

  const sourcePath = path.resolve(cwd, 'lib/constants.d.ts')

  const targetPath = path.resolve(cwd, 'lib/index.d.ts')

  await remove(targetPath)

  await rename(sourcePath, targetPath)
}

main()
