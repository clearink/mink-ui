import { cls } from '@mink-ui/core/_shared/utils'

import type { CheckboxProps } from '../props'

export default function useFormatClassNames(
  prefixCls: string,
  props: CheckboxProps,
  others: Pick<CheckboxProps, 'checked' >,
) {
  const { disabled, indeterminate, className, classNames = {} } = props

  const { checked } = others

  return {
    root: cls(
      prefixCls,
      {
        [`${prefixCls}--checked`]: checked,
        [`${prefixCls}--disabled`]: disabled,
        [`${prefixCls}--indeterminate`]: indeterminate,
      },
      className,
      classNames.root,
    ),
    input: cls(`${prefixCls}__input`, classNames.input),
    inner: cls(`${prefixCls}__inner`, classNames.inner),
    label: cls(`${prefixCls}__label`, classNames.label),
  }
}
