import type { FormEvent } from 'react'
import type { InternalFormInstance } from '../_shared.props'
import type { InternalFormProps, OmittedInternalFormProps, PickedInternalFormProps } from '../form.props'

import { useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import { omit } from '@mink-ui/shared/object/omit'

import { useConstant } from '../../../../hooks/use-constant'
import { useInvoke } from '../../../../hooks/use-invoke'
import { HOOKS_SECRET } from '../_shared.constant'
import { InternalFormProviderContext, InternalFormSharedContext } from '../_shared.context'
import { defaultInternalFormProps as defaultProps, excludedInternalFormProps } from '../form.props'
import { useForm } from '../hooks/use-form'

export function useInternalFormProps<S = any>(props: InternalFormProps<S>) {
  const formShared = InternalFormSharedContext.use()
  const formProvider = InternalFormProviderContext.use()

  const {
    ref,
    form,
    initialValues,
    fields,
    name,
    onReset,
    preserve = defaultProps.preserve,
    component = defaultProps.component,
    validateTrigger = defaultProps.validateTrigger,
  } = props

  const omitted = props as OmittedInternalFormProps<S>
  const picked: PickedInternalFormProps = { preserve, component, validateTrigger }

  const formInstance = useForm(form) as InternalFormInstance<S>

  const $element = useRef<HTMLFormElement>(null)

  const internalHooks = useMemo(() => formInstance.getInternalHooks(HOOKS_SECRET)!, [formInstance])

  useInvoke(() => { internalHooks.updateInternals(picked, omitted, formProvider, formShared) })

  // 设置 Form 各种初始值
  useConstant(() => { internalHooks.defineFormInitials(initialValues, fields) })

  const propsContextValue = useMemo(() => ({ validateTrigger }), [validateTrigger])

  const restAttrs = () => omit(props, excludedInternalFormProps)

  const handleOnReset = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()

    formInstance.resetFields()

    onReset?.(event)
  }

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    event?.stopPropagation()

    formInstance.submitForm()
  }

  useImperativeHandle(ref, () => ({ ...formInstance, nativeElement: $element.current }))

  // 表单联动
  useEffect(() => formProvider?.register(formInstance, name), [formInstance, name, formProvider])

  // 保存内部的 fieldsInfo
  useEffect(() => { internalHooks.saveInternalFields(fields) }, [fields, internalHooks])

  return {
    picked,
    omitted,
    $element,
    formInstance,
    internalHooks,
    propsContextValue,
    restAttrs,
    handleOnReset,
    handleOnSubmit,
  }
}
