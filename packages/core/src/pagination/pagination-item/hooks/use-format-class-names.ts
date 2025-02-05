import type { PaginationItemProps } from '../props'

import { cls } from '../../../_shared/utils'

export default function useFormatClassNames(prefixCls: string, props: PaginationItemProps) {
  const { className, active, disabled } = props

  return {
    root: cls(
      prefixCls,
      {
        [`${prefixCls}--active`]: active,
        [`${prefixCls}--disabled`]: disabled,
      },
      className,
    ),
  }
}
