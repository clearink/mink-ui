import { cls } from '@mink-ui/core/_shared/utils'

import type { FormProps } from '../props'

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
