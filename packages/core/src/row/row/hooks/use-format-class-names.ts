import type { RowProps } from '../props'

import { cls } from '../../../_shared/utils'

export default function useFormatClassNames(prefixCls: string, props: RowProps) {
  const { align, className, justify, wrap, classNames = {} } = props

  return {
    root: cls(
      prefixCls,
      {
        [`${prefixCls}--${align}`]: align,
        [`${prefixCls}--${justify}`]: justify,
        [`${prefixCls}--wrap`]: wrap,
      },
      className,
      classNames.root,
    ),
  }
}
