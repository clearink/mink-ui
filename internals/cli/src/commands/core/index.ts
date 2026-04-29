import { remove } from 'fs-extra'
import { createSpinner } from 'nanospinner'

import { colors } from '../../utils/colors'
import { dts, transform } from '../../utils/compiler'
import { constants } from '../../utils/constants'
import css from './css'

export async function bundle() {
  const start = performance.now()

  const spinner = createSpinner(`core components build starting`).start()

  await Promise.all([constants.esm, constants.cjs].map(f => remove(f)))

  await Promise.all([transform(), dts(), css()])

  const end = performance.now()

  const time = colors.info(`${Math.floor(end - start)}ms`)

  spinner.success(`core components build completed! (${time})`)
}
