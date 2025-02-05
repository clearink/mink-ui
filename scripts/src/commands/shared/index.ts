import { remove } from 'fs-extra'
import { createSpinner } from 'nanospinner'

import { colors } from '../../utils/colors'
import { constants } from '../../utils/constants'
import { buildModules } from './code'
import buildDts from './dts'

export default async function build() {
  if (constants.cwd !== constants.shared) {
    throw new Error('is not shared package')
  }

  const start = performance.now()

  const spinner = createSpinner('starting build shared').start()

  // clean dist
  await Promise.all([constants.esm, constants.cjs].map(f => remove(f)))

  // build source files
  await Promise.all([buildModules(), buildDts()])

  const end = performance.now()

  const time = colors.info(`${Math.floor(end - start)}ms`)

  spinner.success(`build shared completed! (${time})`)
}
