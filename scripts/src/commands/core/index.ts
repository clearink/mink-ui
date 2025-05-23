import { remove } from 'fs-extra'
import { createSpinner } from 'nanospinner'

import { colors } from '../../utils/colors'
import { constants } from '../../utils/constants'
import { buildBundles, buildModules } from './code'
import buildCss from './css'
import buildDts from './dts'

export default async function build() {
  if (constants.cwd !== constants.core) {
    throw new Error('is not components package')
  }

  const start = performance.now()

  const spinner = createSpinner('starting build core').start()

  // clean dist
  await Promise.all([constants.esm, constants.cjs, constants.umd].map(f => remove(f)))

  // build source files
  await Promise.all([buildBundles(), buildModules(), buildCss(), buildDts()])

  const end = performance.now()

  const time = colors.info(`${Math.floor(end - start)}ms`)

  spinner.success(`build core completed! (${time})`)
}
