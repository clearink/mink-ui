import type { PaginationProps } from '../props'

import { cls } from '../../../_shared/utils'

export default function useFormatClassNames(prefixCls: string, props: PaginationProps) {
  const { className, classNames = {} } = props
  return {
    root: cls(
      prefixCls,
      {},
      className,
      classNames.root,
    ),
  }
}
