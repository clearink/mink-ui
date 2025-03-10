import { isUndefined } from '@mink-ui/shared'

import type { SpaceProps } from '../props'

import { cls } from '../../../_shared/utils'

export default function useFormatClassNames(prefixCls: string, props: SpaceProps) {
  const {
    align: _align,
    direction,
    wrap,
    className,
    classNames = {},
  } = props

  const isHorizontal = direction === 'horizontal'

  const align = isHorizontal && isUndefined(_align) ? 'center' : _align

  return {
    root: cls(
      prefixCls,
      {
        [`${prefixCls}--${direction}`]: direction && !isHorizontal,
        [`${prefixCls}--align-${align}`]: align,
        [`${prefixCls}--wrap`]: wrap,
      },
      className,
      classNames.root,
    ),
  }
}
