import type { FormItemProps } from '../props'

import { cls } from '../../../_shared/utils'

export default function useFormatClassNames(prefixCls: string, props: FormItemProps) {
  const { className, hidden } = props

  return {
    root: cls(prefixCls, hidden && `${prefixCls}--hidden`, className),
  }
}
