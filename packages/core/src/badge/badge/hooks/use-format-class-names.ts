import { cls } from '@mink-ui/core/_shared/utils'

import type { BadgeProps } from '../props'

export default function useFormatClassNames(prefixCls: string, props: BadgeProps) {
  const { dot, className, classNames = {} } = props

  return {
    root: cls(
      prefixCls,
      {
        [`${prefixCls}--dot`]: dot,
      },
      className,
      classNames.root,
    ),
    indicator: cls(`${prefixCls}__indicator`, classNames.indicator),
  }
}
