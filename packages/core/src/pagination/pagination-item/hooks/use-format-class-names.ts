import { cls } from '@mink-ui/core/_shared/utils'

import type { PaginationItemProps } from '../props'

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
