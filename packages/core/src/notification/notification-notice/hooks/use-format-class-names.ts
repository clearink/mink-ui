import { cls } from '@mink-ui/core/_shared/utils'

import type { NotificationNoticeProps } from '../props'

export default function useFormatClassNames(
  prefixCls: string,
  props: NotificationNoticeProps,
) {
  const { type, className, classNames = {} } = props

  return {
    root: cls(prefixCls, {
      [`${prefixCls}--${type}`]: type,
    }, className, classNames.root),
    content: cls(`${prefixCls}__content`, classNames.content),
    icon: cls(`${prefixCls}__icon`, classNames.icon),
    closeBtn: cls(`${prefixCls}__close-btn`, classNames.closeBtn),
    message: cls(`${prefixCls}__message`, classNames.message),
    description: cls(`${prefixCls}__description`, classNames.description),
    progress: cls(`${prefixCls}__progress`, classNames.progress),
  }
}
