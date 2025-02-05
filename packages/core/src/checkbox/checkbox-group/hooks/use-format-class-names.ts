import { cls } from '@mink-ui/core/_shared/utils'

import type { CheckboxGroupProps } from '../props'

export default function useFormatClassNames(prefixCls: string, props: CheckboxGroupProps) {
  const { className, classNames = {} } = props

  return {
    root: cls(
      prefixCls,
      { },
      className,
      classNames.root,
    ),
  }
}
