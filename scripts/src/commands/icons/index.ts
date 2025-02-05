import { remove } from 'fs-extra'
import { createSpinner } from 'nanospinner'

import { colors } from '../../utils/colors'
import { constants } from '../../utils/constants'
import { buildBundles, buildModules } from './code'
import buildDts from './dts'
import genIcons from './gen'

export default async function build() {
  if (constants.cwd !== constants.icons) {
    throw new Error('is not icons package')
  }

  const start = performance.now()

  const spinner = createSpinner('starting build icons').start()

  // clean dist
  await Promise.all([constants.resolveSrc('icons'), constants.esm, constants.cjs, constants.umd].map(f => remove(f)))

  // generate icon files
  await genIcons()

  // build source files
  await Promise.all([buildBundles(), buildModules(), buildDts()])

  const end = performance.now()

  const time = colors.info(`${Math.floor(end - start)}ms`)

  spinner.success(`build icons completed! (${time})`)
}

export async function generate() {
  if (constants.cwd !== constants.icons) {
    throw new Error('is not icons package')
  }

  await remove(constants.resolveSrc('icons'))

  const start = performance.now()

  const spinner = createSpinner('starting generate icons').start()

  await genIcons()

  const end = performance.now()

  const time = colors.info(`${Math.floor(end - start)}ms`)

  spinner.success(`generate icons completed! (${time})`)
}
