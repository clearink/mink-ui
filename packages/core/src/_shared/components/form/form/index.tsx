import type { FormEvent, ForwardedRef } from 'react'

import { isFunction, isNullish, omit } from '@mink-ui/shared'
import { createElement, forwardRef, useEffect, useImperativeHandle, useMemo } from 'react'

import type { InternalFormContextState } from '../_shared.context'
import type { InternalFormInstance } from './control/props'
import type { InternalFormProps } from './props'

import { useConstant } from '../../../../_shared/hooks'
import { betterDisplayName, withDefaults } from '../../../../_shared/utils'
import { InternalFormContext, InternalFormInstanceContext, InternalFormListContext, InternalFormProviderContext } from '../_shared.context'
import { HOOK_MARK } from './control'
import useForm from './hooks/use-form'
import useSyncFields from './hooks/use-sync-fields'
import { defaultInternalFormProps } from './props'

const excluded = [
  'name',
  'tag',
  'form',
  'children',
  'onReset',
  'initialValues',
  'validateTrigger',
  'preserve',
  'validationSchema',
  'fields',
  'onFinish',
  'onFieldsChange',
  'onValuesChange',
  'onFailed',
] as const

function InternalForm<State = any>(
  _props: InternalFormProps<State>,
  ref: ForwardedRef<InternalFormInstance<State>>,
) {
  const props = useMemo(() => withDefaults(_props, defaultInternalFormProps), [_props])

  const {
    children,
    fields,
    form,
    initialValues,
    name,
    tag,
    validateTrigger,
    onReset,
  } = props

  // 用于多表单联动
  const formProvider = InternalFormProviderContext.useState()

  const instance = useForm(form) as InternalFormInstance<State>

  useImperativeHandle(ref, () => instance, [instance])

  const internalHooks = useMemo(() => instance.getInternalHooks(HOOK_MARK)!, [instance])

  useMemo(() => {
    internalHooks.setInternalFormProps(props, formProvider)
  }, [internalHooks, formProvider, props])

  // 合并初始值
  useConstant(() => { internalHooks.mergeInitialValues(initialValues) })

  useEffect(() => formProvider?.register(instance, name), [instance, name, formProvider])

  useSyncFields(internalHooks, fields)

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault()
    e?.stopPropagation()

    instance.submitForm()
  }

  const handleReset = (e: FormEvent) => {
    e?.preventDefault()
    e?.stopPropagation()

    instance.resetFields()

    onReset?.(e)
  }

  const formInstanceContext = useMemo(() => instance, [instance])

  const formContext = useMemo<InternalFormContextState>(() => ({ validateTrigger }), [validateTrigger])

  const elements = (
    // Form.List 不可跨 Form 嵌套
    <InternalFormListContext.Provider value={null}>
      {/* 提供 Form.Item 某些属性 */}
      <InternalFormContext.Provider value={formContext}>
        {/* 提供 FormInstance 实例 */}
        <InternalFormInstanceContext.Provider value={formInstanceContext}>
          {isFunction(children) ? children(instance.getFieldsValue(true), instance) : children}
        </InternalFormInstanceContext.Provider>
      </InternalFormContext.Provider>
    </InternalFormListContext.Provider>
  )

  if (isNullish(tag)) return elements

  // 表单剩余字段
  const attrs: any = {
    ...omit(props, excluded),
    onReset: handleReset,
    onSubmit: handleSubmit,
  }

  return createElement(tag, attrs, elements)
}

betterDisplayName(InternalForm)

export default forwardRef(InternalForm) as <State = any>(
  props: InternalFormProps<State> & React.RefAttributes<InternalFormInstance<State>>,
) => JSX.Element
