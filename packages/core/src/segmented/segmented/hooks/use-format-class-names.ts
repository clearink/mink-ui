import type { SegmentedProps } from '../props'

import { cls } from '../../../_shared/utils'

export default function useFormatClassNames(prefixCls: string, props: SegmentedProps) {
  const { block, className, classNames = {}, disabled, size } = props

  return {
    group: cls(`${prefixCls}__group`, classNames.group),
    root: cls(
      prefixCls,
      {
        [`${prefixCls}--block`]: block,
        [`${prefixCls}--disabled`]: disabled,
        [`${prefixCls}--lg`]: size === 'large',
        [`${prefixCls}--sm`]: size === 'small',
      },
      className,
      classNames.root,
    ),
    thumb: cls(`${prefixCls}__thumb`, classNames.thumb),
  }
}
