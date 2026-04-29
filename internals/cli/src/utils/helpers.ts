import path from 'node:path'

import glob from 'fast-glob'
import fse from 'fs-extra'

import { constants } from './constants'

export { toArray } from '../../../../packages/shared/src/array/to-array'
export { isArray } from '../../../../packages/shared/src/is/is-array'
export { isObject } from '../../../../packages/shared/src/is/is-object'
export { isUndefined } from '../../../../packages/shared/src/is/is-undefined'
export { capitalize } from '../../../../packages/shared/src/string/capitalize'

export function removeExtname(file: string) {
  return file.slice(0, -path.extname(file).length)
}

export async function ensureWriteFile(filePath: string, data: string) {
  await fse.ensureFile(filePath)

  return fse.writeFile(filePath, data, { encoding: 'utf-8' })
}

export async function collectEntries() {
  const { src, ignoreFiles } = constants

  const globOptions = { cwd: src, ignore: ignoreFiles.concat('**/style') }

  const relatives = await glob.async('**/*.ts{,x}', globOptions)

  return relatives.reduce((entries, relative) => {
    entries[removeExtname(relative)] = path.resolve(src, relative)
    return entries
  }, {} as Record<string, string>)
}
