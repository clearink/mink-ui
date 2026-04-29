import type { InternalFormFieldProps, OmittedInternalFormFieldProps, PickedInternalFormFieldProps } from '../form-field.props'

import isEqual from 'react-fast-compare'
import { useEffect, useMemo, useReducer } from 'react'

import { useConstant } from '../../../../hooks/use-constant'
import { useForceUpdate } from '../../../../hooks/use-force-update'
import { useInvoke } from '../../../../hooks/use-invoke'
import { useWatchValue } from '../../../../hooks/use-watch-value'
import { HOOKS_SECRET } from '../_shared.constant'
import { InternalFormInstanceContext, InternalFormPropsContext } from '../_shared.context'
import { defaultGetValueFromEvent, defaultGetValueProps, defaultInternalFormFieldProps as defaultProps } from '../form-field.props'
import { FormFieldControl } from '../utils/field-control'

export function useInternalFormFieldProps(props: InternalFormFieldProps) {
  // 表单实例
  const formInstance = InternalFormInstanceContext.use()
  const propsContext = InternalFormPropsContext.use()

  const {
    name,
    dependencies,
    validateTrigger = propsContext.validateTrigger,
    valuePropName = defaultProps.valuePropName,
    valueTrigger = defaultProps.valueTrigger,
    getValueProps = defaultGetValueProps(valuePropName!),
    getValueFromEvent = defaultGetValueFromEvent(valuePropName!),
  } = props

  const omitted = props as OmittedInternalFormFieldProps
  const picked: PickedInternalFormFieldProps = {
    valueTrigger,
    valuePropName,
    validateTrigger,
    getValueProps,
    getValueFromEvent,
  }

  const internalHooks = useMemo(() => formInstance.getInternalHooks(HOOKS_SECRET)!, [formInstance])

  const forceUpdate = useForceUpdate()

  const [refreshCount, refreshField] = useReducer(count => count + 1, 0)

  const control = useConstant(() => new FormFieldControl(forceUpdate, refreshField))

  // 同步内部属性，使用 useMemo 兼容 react-dev-tool
  useInvoke(() => { control.updateInternals(omitted) })

  // 设置字段初始值 (同时返回当前字段值)
  const transient = useConstant(() => internalHooks.defineInitialValue(control))

  // 监听 name 是否变化
  const nameChanged = useWatchValue(name, {
    compare: isEqual,
    listener: (_, prev) => { internalHooks.updateControlsMap(control, prev) },
  })

  // 监听 dependencies 是否变化
  const depsChanged = useWatchValue(dependencies, {
    compare: isEqual,
    listener: () => { internalHooks.updateFieldGraph(control) },
  })

  // 注册字段 & 建立依赖图
  useEffect(() => internalHooks.registerField(control, transient), [internalHooks, control, transient])

  return {
    picked,
    omitted,
    control,
    refreshCount,
    formInstance,
    internalHooks,
    returnEmpty: nameChanged || depsChanged,
  }
}
