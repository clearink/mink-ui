import { useEffect, useMemo, useReducer } from 'react'

import type { InternalFormInstance, InternalHooksReturn } from '../../form/control/props'
import type { InternalFormFieldProps } from '../props'

import { useConstant, useForceUpdate, useIsomorphicEffect } from '../../../../hooks'
import { FormFieldControl } from '../control'

export default function useFieldBootstrap<S = any>(
  internalHooks: InternalHooksReturn<S>,
  formInstance: InternalFormInstance,
  props: InternalFormFieldProps<S>,
) {
  const forceUpdate = useForceUpdate()

  // 刷新字段
  const [refreshCount, refreshField] = useReducer(count => count + 1, 0)

  const control = useConstant(() => new FormFieldControl(forceUpdate, refreshField))

  useMemo(() => { control.setInternalFieldProps(props) }, [control, props])

  // 提前初始化字段 (避免在 registerField 多次调用)
  useConstant(() => { internalHooks.initInitialValue(control) })

  // 字段在该 render 阶段时的值
  const fieldTransient = useConstant(() => formInstance.getFieldValue(control._name))

  // 注册字段
  useIsomorphicEffect(() => {
    return internalHooks.registerField(control, fieldTransient)
  }, [internalHooks, control, fieldTransient])

  // 收集依赖
  useEffect(() => internalHooks.collectDependencies(control), [internalHooks, control])

  return [control, refreshCount] as const
}
