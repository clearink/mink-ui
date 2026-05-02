import type { OmittedCheckboxProps, PickedCheckboxProps } from '../checkbox.props'

import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'
import { cn } from '../../../_shared/libs/cn'

/**
 * @description 获取 Checkbox 的 className
 */
export function useCheckboxClassNames(
  picked: PickedCheckboxProps,
  omitted: OmittedCheckboxProps,
  others: { checked?: boolean },
) {
  const { disabled } = picked
  const { indeterminate, prefixCls } = omitted
  const { checked } = others

  const ns = useNamespace('checkbox', prefixCls)

  return {
    ns,
    classNames: {
      root: cn(ns, {
        [`${ns}--checked`]: checked,
        [`${ns}--disabled`]: disabled,
        [`${ns}--indeterminate`]: indeterminate,
      }),
      input: `${ns}__input`,
      inner: `${ns}__inner`,
      label: `${ns}__label`,
    },
  }
}
