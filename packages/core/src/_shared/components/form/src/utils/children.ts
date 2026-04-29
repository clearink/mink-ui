import type { ReactElement, ReactNode } from 'react'
import type { AnyObj } from '@mink-ui/shared/interface'
import type { InternalFormInstance, InternalHooksReturn } from '../_shared.props'
import type { InternalFormFieldProps, OmittedInternalFormFieldProps, PickedInternalFormFieldProps } from '../form-field.props'
import type { FormFieldControl } from './field-control'

import { cloneElement, isValidElement } from 'react'
import { toArray } from '@mink-ui/shared/array/to-array'
import { isFunction } from '@mink-ui/shared/is/is-function'

import { flattenChildren } from '../../../../utils/children'
import { logger } from '../../../../utils/logger'

/**
 * @description 格式化子元素的返回值
 */
export type NormalizeChildrenReturn = {
  children: ReactNode
  functional: true
  isValid?: boolean
} | {
  children: ReactElement
  functional?: false
  isValid: true
} | {
  children: ReactNode[]
  functional?: false
  isValid: false
}

function createCollectFunction(
  internalHooks: InternalHooksReturn,
  formInstance: InternalFormInstance,
  control: FormFieldControl,
  picked: PickedInternalFormFieldProps,
  omitted: OmittedInternalFormFieldProps,
) {
  const { valueTrigger, validateTrigger, getValueProps, getValueFromEvent } = picked
  const { name, rule, valueFormatter } = omitted

  return (original: AnyObj = {}) => {
    const injected = {
      ...original,
      ...control._id ? getValueProps!(formInstance.getFieldValue(name)) : null,
      // 触发条件
      [valueTrigger!]: (...args: any[]) => {
        // 获取最新值,避免闭包的影响
        const prev = formInstance.getFieldValue(name)

        const next = valueFormatter
          ? valueFormatter(getValueFromEvent!(...args), prev, () => formInstance.getFieldsValue(true))
          : getValueFromEvent!(...args)

        if (prev !== next) {
          internalHooks.dispatch({ type: 'fieldEvent', control, value: next })
        }

        // 执行原始事件
        original[valueTrigger!]?.(...args)
      },
    }

    // 字段校验时机
    return toArray(validateTrigger).reduce((result, triggerName) => {
      if (triggerName === false) return result

      result[triggerName] = (...args: any[]) => {
        injected[triggerName]?.(...args)
        rule && formInstance.validateField(name)
        // rule && formInstance.validateField(name, { triggerName })
      }

      return result
    }, { ...injected })
  }
}

function createNormalizeFunction(
  handleCollect: () => AnyObj,
  formInstance: InternalFormInstance,
  control: FormFieldControl,
) {
  return function normalizeInner(children: InternalFormFieldProps['children']): NormalizeChildrenReturn {
    if (isFunction(children)) {
      const element = children(handleCollect(), control.getMetaInfo(), formInstance)
      return { ...normalizeInner(element), functional: true }
    }

    // 拍平 children 的去除 nullish, fragment, render props
    const nodeList = flattenChildren(children)

    // Form.Field 直接包裹的元素，且是 合法的 reactELement
    if (nodeList.length === 1 && isValidElement(nodeList[0])) {
      return { children: nodeList[0], isValid: true }
    }

    return { children: nodeList, isValid: false }
  }
}

/**
 * @description 标准化 子元素
 */
export function normalizeFieldChildren(
  internalHooks: InternalHooksReturn,
  formInstance: InternalFormInstance,
  control: FormFieldControl,
  picked: PickedInternalFormFieldProps,
  omitted: OmittedInternalFormFieldProps,
) {
  const { children: _children } = omitted

  // 收集子组件的属性
  const handleCollect = createCollectFunction(internalHooks, formInstance, control, picked, omitted)

  // 处理子元素
  const handleNormalize = createNormalizeFunction(handleCollect, formInstance, control)

  const { children, functional, isValid } = handleNormalize(_children)

  if (process.env.NODE_ENV !== 'production') {
    if (!functional && !isValid) {
      logger.error('InternalForm.Field', 'children should be a valid ReactElement or a function')
    }
  }

  if (functional || !isValid) return children

  return cloneElement(children, handleCollect(children.props!))
}
