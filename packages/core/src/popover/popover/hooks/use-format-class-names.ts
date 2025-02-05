import { cls } from '@mink-ui/core/_shared/utils'

import type { PopoverProps } from '../props'

export default function useFormatClassNames(prefixCls: string, props: PopoverProps) {
  const { className, classNames = {} } = props

  return {
    arrow: cls(`${prefixCls}__arrow`, classNames.arrow),
    content: cls(`${prefixCls}__content`, classNames.content),
    root: cls(prefixCls, className, classNames.root),
    title: cls(`${prefixCls}__title`, classNames.title),
  }
}
