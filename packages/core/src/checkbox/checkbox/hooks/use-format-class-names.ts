import type { CheckboxProps } from '../props'

import { cls } from '../../../_shared/utils'

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
