import type { GeneratedFormFieldProps, GeneratedFormListProps, InternalFormFieldProps, OmittedInternalFormFieldProps, PickedInternalFormFieldProps } from '../form-field.props'

import isEqual from 'react-fast-compare'
import { useEffect, useMemo, useReducer } from 'react'
import { toArray } from '@mink-ui/shared/array/to-array'

import { useConstant } from '../../../../hooks/use-constant'
import { useForceUpdate } from '../../../../hooks/use-force-update'
import { useInvoke } from '../../../../hooks/use-invoke'
import { useWatchValue } from '../../../../hooks/use-watch-value'
import { logger } from '../../../../utils/logger'
import { HOOKS_SECRET } from '../_shared.constant'
import { InternalFormInstanceContext, InternalFormListContext, InternalFormPropsContext } from '../_shared.context'
import { defaultGetValueFromEvent, defaultGetValueProps, defaultInternalFormFieldProps as defaultProps } from '../form-field.props'
import { FormFieldControl } from '../utils/field-control'
import { normalizeIsListField } from '../utils/helpers'
import { _getId } from '../utils/path'

export function useInternalFormFieldProps(props: InternalFormFieldProps) {
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

  useInvoke(() => { control._bind(omitted) })

  // 设置字段初始值 (同时返回当前字段值)
  const transient = useConstant(() => internalHooks.defineInitialValue(control))

  // 监听 name 是否变化
  const nameChanged = useWatchValue(name, (_, prev) => { internalHooks.updateControlsMap(control, prev) }, isEqual)

  // 监听 dependencies 是否变化
  const depsChanged = useWatchValue(dependencies, () => { internalHooks.updateFieldEdges(control) }, isEqual)

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

export function useInternalGeneratedProps<V>(
  props: GeneratedFormListProps<V> | GeneratedFormFieldProps<V>,
  isFormList: boolean,
) {
  const listContext = InternalFormListContext.use()

  const { name, preserve, listControl } = props as GeneratedFormListProps<V>

  const arrayName = toArray(name)

  const isListField = normalizeIsListField(props, listContext, arrayName)

  // 是 ListField 合并 listName
  const fieldName = isListField ? isListField.listName.concat(arrayName) : arrayName

  if (process.env.NODE_ENV !== 'production') {
    if (preserve === false && isListField && isListField.type === 'simple') {
      logger.warn('InternalForm.Field', '`preserve` should not apply on Form.List direct field.')
    }
  }

  return {
    key: isListField ? 'controlled' : _getId(fieldName),
    attrs: {
      ...props,
      isFormList: (isFormList ? { listControl } : false) as InternalFormFieldProps['isFormList'],
      isListField,
      name: fieldName,
    },
  }
}
