import { remove } from 'fs-extra'
import { createSpinner } from 'nanospinner'

import { colors } from '../../utils/colors'
import { dts, subpath, transform } from '../../utils/compiler'
import { constants } from '../../utils/constants'
import { removeExtname } from '../../utils/helpers'

/**
 * @description 编译源文件
 */
export async function bundle() {
  const start = performance.now()

  const spinner = createSpinner('starting build icons').start()

  await Promise.all([constants.esm, constants.cjs].map(f => remove(f)))

  await Promise.all([transform(), dts()])

  const end = performance.now()

  const time = colors.info(`${Math.floor(end - start)}ms`)

  spinner.success(`build icons completed! (${time})`)
}

/**
 * @description 生成 exports 定义
 */
export async function sub() {
  const start = performance.now()

  const spinner = createSpinner('starting generate shared subpath import').start()

  await subpath({
    formatSubName: (file) => {
      const subName = removeExtname(file)

      return subName === 'index' ? '.' : `./${subName}`
    },
  })

  const end = performance.now()

  const time = colors.info(`${Math.floor(end - start)}ms`)

  spinner.success(`generate shared subpath import completed! (${time})`)
}
