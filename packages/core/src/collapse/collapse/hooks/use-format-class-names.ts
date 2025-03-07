import type { CollapseProps } from '../props'

import { cls } from '../../../_shared/utils'

export default function useFormatClassNames(prefixCls: string, props: CollapseProps) {
  const { bordered, className, classNames, expandIconPosition, ghost, size } = props

  return {
    root: cls(
      prefixCls,
      {
        [`${prefixCls}--bordered`]: bordered && !ghost,
        [`${prefixCls}--ghost`]: ghost,
        [`${prefixCls}--icon-end`]: expandIconPosition === 'end',
        [`${prefixCls}--lg`]: size === 'large',
        [`${prefixCls}--sm`]: size === 'small',
      },
      className,
      classNames?.root,
    ),
  }
}
