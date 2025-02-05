import type { FormProps } from '../props'

import { cls } from '../../../_shared/utils'

export default function useFormatClassNames(prefixCls: string, props: FormProps) {
  const { className, layout, requiredMark, size } = props

  return cls(
    prefixCls,
    {
      [`${prefixCls}--${layout}`]: layout,
      [`${prefixCls}--${size}`]: size,
      [`${prefixCls}--hide-required-mark`]: !requiredMark,
    },
    className,
  )
}
