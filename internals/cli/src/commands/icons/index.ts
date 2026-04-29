import { remove } from 'fs-extra'
import { createSpinner } from 'nanospinner'

import { colors } from '../../utils/colors'
import { dts, subpath, transform } from '../../utils/compiler'
import { constants } from '../../utils/constants'
import { removeExtname } from '../../utils/helpers'
import { gen } from './gen'

/**
 * @description 编译源文件
 */
export async function bundle() {
  const start = performance.now()

  const spinner = createSpinner('starting build icons').start()

  await Promise.all([constants.esm, constants.cjs].map(f => remove(f)))

  await gen(false)

  await Promise.all([transform(), dts()])

  const end = performance.now()

  const time = colors.info(`${Math.floor(end - start)}ms`)

  spinner.success(`build icons completed! (${time})`)
}

/**
 * @description 生成 icons 组件
 */
export async function generate() {
  const start = performance.now()

  const spinner = createSpinner('starting generate icons').start()

  await remove(constants.resolveSrc('icons'))

  await gen(true)

  const end = performance.now()

  const time = colors.info(`${Math.floor(end - start)}ms`)

  spinner.success(`generate icons completed! (${time})`)
}

/**
 * @description 生成 exports 定义
 */
export async function sub() {
  const start = performance.now()

  const spinner = createSpinner('starting generate icons subpath import').start()

  await subpath({
    formatSubName: (file) => {
      const subName = removeExtname(file)

      if (subName === 'index') return '.'

      if (subName === 'shared/_shared.context') return './IconConfigContext'

      if (subName === 'shared/icon-font') return './IconFont'

      if (subName === 'icons/index' || !subName.startsWith('icons')) return false

      return `./${subName.replace(/^icons\//, '')}`
    },
  })

  const end = performance.now()

  const time = colors.info(`${Math.floor(end - start)}ms`)

  spinner.success(`generate icons subpath import completed! (${time})`)
}
