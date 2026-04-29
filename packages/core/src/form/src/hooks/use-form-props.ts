import type { FormPropsContextState } from '../_shared.context'
import type { FormProps, OmittedFormProps, PickedFormProps } from '../form.props'

import { useImperativeHandle, useMemo } from 'react'
import { fallback } from '@mink-ui/shared/function/fallback'
import { omit } from '@mink-ui/shared/object/omit'

import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { DisabledContext, SizeContext } from '../../../config-provider/src/_shared.context'
import { defaultFormProps as defaultProps, excludedFormProps } from '../form.props'
import { useFormClassNames } from './use-class-names'
import { useForm } from './use-form'

export function useFormProps<S = any>(props: FormProps<S>) {
  const globalConfig = useConfiguration('form')
  const disabledContext = DisabledContext.use()
  const sizeContext = SizeContext.use()

  const {
    ref,
    form,
    labelAlign,
    labelWrap,
    labelCol,
    wrapperCol,
    name,
    validateMessages: _validateMessages,
    // scrollToFirstError = globalConfig.scrollToFirstError
    onFailed,
    size = sizeContext,
    colon = fallback(globalConfig.colon, defaultProps.colon),
    layout = defaultProps.layout,
    variant = defaultProps.variant,
    disabled = disabledContext,
    requiredMark = fallback(globalConfig.requiredMark, defaultProps.requiredMark),
  } = props

  const omitted = props as OmittedFormProps<S>
  const picked: PickedFormProps = {
    size,
    colon,
    layout,
    variant,
    disabled,
    requiredMark,
  }

  const classNames = useFormClassNames(picked, omitted)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      classNames,
      omitted.classNames,
      { root: omitted.className },
    ],
    [
      omitted.styles,
      { root: omitted.style },
    ],
  )

  const formInstance = useForm(form)

  const propsContextValue = useMemo<FormPropsContextState>(() => ({
    colon,
    labelAlign,
    labelWrap,
    labelCol,
    wrapperCol,
    layout,
    requiredMark,
    name,
    form: formInstance,
    styles: { label: cssAttrs.label, input: cssAttrs.input },
    classNames: { label: cssNames.label, input: cssNames.input },
  }), [
    colon,
    formInstance,
    labelAlign,
    labelCol,
    labelWrap,
    layout,
    name,
    requiredMark,
    wrapperCol,
    cssNames.label,
    cssNames.input,
    cssAttrs.label,
    cssAttrs.input,
  ])

  const validateMessages = useMemo(() => {
    return { ...globalConfig.validateMessages, ..._validateMessages }
  }, [_validateMessages, globalConfig.validateMessages])

  const restAttrs = omit(props, excludedFormProps)

  const handleOnFailed = (errors: any) => {
    onFailed?.(errors)

    // if(scrollToFirstError) formInstance.scrollToField(errors[0]?.name)
  }

  // TODO: 需要再加上 nativeElement 的处理
  useImperativeHandle(ref, () => formInstance, [formInstance])

  return {
    picked,
    omitted,
    cssNames,
    cssAttrs,
    restAttrs,
    formInstance,
    propsContextValue,
    validateMessages,
    handleOnFailed,
  }
}
