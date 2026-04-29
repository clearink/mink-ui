import type { OmittedSpaceProps, PickedSpaceProps } from '../space.props'

import { isUndefined } from '@mink-ui/shared/is/is-undefined'

import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'
import { cn } from '../../../_shared/libs/cn'
import { isBuiltinOrientation } from '../../../config-provider/src/utils/orientation'
import { formatSpaceGutter } from '../utils/helpers'

export function useSpaceClassNames(picked: PickedSpaceProps, omitted: OmittedSpaceProps) {
  const { orientation, wrap } = picked
  const { align, prefixCls } = omitted

  const ns = useNamespace('space', prefixCls)

  const isHorizontal = orientation === 'horizontal'

  const finalAlign = isHorizontal && isUndefined(align) ? 'center' : align

  const { hGutter, hIsBuiltin, hIsNumeric, vGutter, vIsBuiltin, vIsNumeric } = formatSpaceGutter(picked)

  return {
    hGutter,
    hIsBuiltin,
    hIsNumeric,
    vGutter,
    vIsBuiltin,
    vIsNumeric,
    classNames: {
      root: cn(ns, {
        [`${ns}--${orientation}`]: isBuiltinOrientation(orientation),
        [`${ns}--align-${finalAlign}`]: finalAlign,
        [`${ns}--wrap`]: wrap,
        [`${ns}--row-${vGutter}`]: vIsBuiltin,
        [`${ns}--col-${hGutter}`]: hIsBuiltin,
      }),
      item: `${ns}__item`,
      separator: `${ns}__separator`,
    },
  }
}
