import type { PopoverProps } from '../props'

import { cls } from '../../../_shared/utils'

export default function useFormatClassNames(prefixCls: string, props: PopoverProps) {
  const { className, classNames = {} } = props

  return {
    arrow: cls(`${prefixCls}__arrow`, classNames.arrow),
    content: cls(`${prefixCls}__content`, classNames.content),
    root: cls(prefixCls, className, classNames.root),
    title: cls(`${prefixCls}__title`, classNames.title),
  }
}
