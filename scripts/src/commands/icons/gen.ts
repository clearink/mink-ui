import glob from 'fast-glob'
import { XMLParser } from 'fast-xml-parser'
import fse from 'fs-extra'
import path from 'node:path'

import { constants, ensureWriteFile, formatIconName, genIconSource, optimizeIcon, removeExtname, toBase64 } from '../../utils'

export default async function genIcons() {
  const assets = constants.resolveIcons('assets')

  const iconsDir = constants.resolveIcons('src/icons')

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: constants.iconAttrNamePrefix,
  })

  const iconEntries: string[] = []

  const globOptions = { cwd: assets, ignore: constants.ignoreFiles }

  const files = await glob.async('**/*.svg', globOptions)

  const promises = files.map(async (file) => {
    const iconName = formatIconName(file)

    const source = await fse.readFile(path.resolve(assets, file), { encoding: 'utf8' })

    iconEntries.push(`export { default as ${iconName} } from './${iconName}'`)

    const result = genIconSource({
      base64: toBase64(source),
      fileName: removeExtname(path.basename(file)),
      iconName,
      dirName: path.dirname(file),
      json: parser.parse(optimizeIcon(source).data),
    })

    return ensureWriteFile(path.resolve(iconsDir, `${iconName}.tsx`), result)
  })

  await Promise.all(promises)

  const content = `/* eslint-disable */\n\n${iconEntries.join('\n')}`

  await ensureWriteFile(path.resolve(iconsDir, 'index.tsx'), content)
}
