import type { ValidateStatus } from '../_shared.props'
import type { OmittedFormItemInputProps } from '../form-item-input.props'
import type { OmittedFormItemLabelProps, PickedFormItemLabelProps } from '../form-item-label.props'
import type { OmittedFormItemProps } from '../form-item.props'
import type { OmittedFormProps, PickedFormProps } from '../form.props'

import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'
import { cn } from '../../../_shared/libs/cn'

/**
 * @description Form 组件的 class 名称
 */
export function useFormClassNames(picked: PickedFormProps, omitted: OmittedFormProps) {
  const { layout, size } = picked
  const { prefixCls } = omitted

  const ns = useNamespace('form', prefixCls)

  return {
    root: cn(ns, {
      [`${ns}--layout-${layout}`]: layout,
      [`${ns}--size-${size}`]: size,
    }),
    label: undefined,
    input: undefined,
  }
}

/**
 * @description FormItem 组件的 class 名称
 */
export function useImpureFormItemClassNames(
  omitted: OmittedFormItemProps,
  hasError: boolean,
  status: ValidateStatus,
) {
  const { hasFeedback, hidden, prefixCls } = omitted

  const ns = useNamespace('form-item', prefixCls)

  return {
    ns,
    classNames: {
      root: cn(ns, {
        [`${ns}--has-help`]: hasError,
        [`${ns}--feedback`]: status && hasFeedback,
        [`${ns}--success`]: status === 'success',
        [`${ns}--warning`]: status === 'warning',
        [`${ns}--error`]: status === 'error',
        [`${ns}--validating`]: status === 'validating',
        [`${ns}--hidden`]: hidden,
      }),
      label: undefined,
      input: undefined,
    },
  }
}

/**
 * @description FormItemLabel 组件的 class 名称
 */
export function useFormItemLabelClassNames(
  picked: PickedFormItemLabelProps,
  omitted: OmittedFormItemLabelProps,
) {
  const { labelAlign, labelWrap, colon } = picked
  const { rootNamespace, required } = omitted

  const markType = 'required'

  const ns = `${rootNamespace}__label`

  return {
    root: cn(ns, {
      [`${ns}--left`]: labelAlign === 'left',
      [`${ns}--wrap`]: !!labelWrap,
      [`${ns}--required`]: required,
      [`${ns}--mark-${markType}`]: markType,
      [`${ns}--no-colon`]: !colon,
    }),
    content: `${ns}-content`,
  }
}

/**
 * @description
 */
export function useFormItemInputClassNames(omitted: OmittedFormItemInputProps) {
  const { rootNamespace } = omitted

  const ns = `${rootNamespace}__input`

  // TODO: wrapperCol 需要经过计算. 这里需要确认下
  return {
    root: ns,
    content: `${ns}-content`,
    additional: `${ns}-additional`,
    messages: `${ns}-messages`,
    extra: `${ns}-extra`,
    offset: `${ns}-offset`,
  }
}
