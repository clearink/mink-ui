import type { DrawerProps } from '../props'

import { cls } from '../../../_shared/utils'

export default function useFormatClassNames(prefixCls: string, props: DrawerProps) {
  const { className, classNames = {} } = props

  return {
    body: cls(`${prefixCls}__body`, classNames.body),
    close: cls(`${prefixCls}__close`, classNames.close),
    footer: cls(`${prefixCls}__footer`, classNames.footer),
    header: cls(`${prefixCls}__header`, classNames.header),
    main: cls(`${prefixCls}__main`, classNames.main),
    root: cls(prefixCls, className, classNames.root),
  }
}
