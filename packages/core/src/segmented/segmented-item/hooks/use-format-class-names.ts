import { cls } from '@mink-ui/core/_shared/utils'

import type { SegmentedItemProps } from '../props'

export default function useFormatClassNames(prefixCls: string, props: SegmentedItemProps) {
  const { checked, className, classNames = {}, disabled, showThumb } = props

  return {
    label: cls(`${prefixCls}__label`, classNames.label),
    radio: cls(`${prefixCls}__radio`),
    root: cls(
      prefixCls,
      {
        [`${prefixCls}--disabled`]: disabled,
        [`${prefixCls}--selected`]: checked && !showThumb,
      },
      className,
      classNames.root,
    ),
  }
}
