import type { PickedSpaceProps } from '../space.props'

import { isArray } from '@mink-ui/shared/is/is-array'
import { isNumber } from '@mink-ui/shared/is/is-number'

import { isBuiltinSize } from '../../../config-provider/src/utils/size'

/**
 * @description 检查是否为有效的数字间距（排除 0 和 NaN）
 */
function isValidNumericGutter(value: any): value is number {
  return isNumber(value) && !Number.isNaN(value) && value !== 0
}

/**
 * @description 格式化 Space 的间距
 */
export function formatSpaceGutter(picked: PickedSpaceProps) {
  const { size } = picked

  const [hGutter, vGutter] = isArray(size) ? size : [size, size]

  const hIsBuiltin = isBuiltinSize(hGutter)
  const vIsBuiltin = isBuiltinSize(vGutter)

  const hIsNumeric = !hIsBuiltin && isValidNumericGutter(hGutter)
  const vIsNumeric = !hIsBuiltin && isValidNumericGutter(vGutter)

  return {
    hGutter,
    hIsBuiltin,
    hIsNumeric,
    vGutter,
    vIsBuiltin,
    vIsNumeric,
  }
}
