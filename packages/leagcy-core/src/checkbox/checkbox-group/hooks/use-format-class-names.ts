import type { CheckboxGroupProps } from '../props'

import { cls } from '../../../_shared/utils'

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
