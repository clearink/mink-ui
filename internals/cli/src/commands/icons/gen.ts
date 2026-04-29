import path from 'node:path'

import glob from 'fast-glob'
import fse from 'fs-extra'

import { constants } from '../../utils/constants'
import { ensureWriteFile } from '../../utils/helpers'
import { formatXmlContent } from './utils/format'

export async function gen(force: boolean) {
  const source = constants.resolveCwd('./assets')
  const target = constants.resolveSrc('./icons')

  // 非强制 && 目标文件存在
  if (!force && await fse.exists(target)) return

  const iconEntries: string[] = []

  const globOptions = { cwd: source, ignore: constants.ignoreFiles }

  const files = await glob.async('**/*.svg', globOptions)

  const promises = files.map(async (relativePath) => {
    const sourcePath = path.resolve(source, relativePath)

    const fileContent = await fse.readFile(sourcePath, { encoding: 'utf8' })

    const { iconName, formatted } = formatXmlContent(fileContent, relativePath)

    iconEntries.push(`export { default as ${iconName} } from './${iconName}'`)

    return ensureWriteFile(path.resolve(target, `${iconName}.tsx`), formatted)
  })

  await Promise.all(promises)

  const content = `/* eslint-disable */\n\n${iconEntries.join('\n')}`

  await ensureWriteFile(path.resolve(target, 'index.tsx'), content)
}
