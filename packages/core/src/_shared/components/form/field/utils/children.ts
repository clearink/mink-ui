import type { AnyObj } from '@mink-ui/shared'
import type { ReactElement, ReactNode } from 'react'

import { fallback, isFunction, toArray } from '@mink-ui/shared'
import { cloneElement, isValidElement } from 'react'

import type { InternalFormContextState } from '../../_shared.context'
import type { InternalFormInstance, InternalHooksReturn } from '../../form/control/props'
import type { FormFieldControl } from '../control'
import type { InternalFormFieldProps } from '../props'

import { flattenChildren } from '../../../../../_shared/utils'
import { logger } from '../../../../utils'

function getCollectFunction(
  internalHooks: InternalHooksReturn,
  formContext: InternalFormContextState,
  instance: InternalFormInstance,
  control: FormFieldControl,
  props: InternalFormFieldProps,
) {
  const { name, rule, trigger, validateTrigger, formatter, getValueProps, getValueFromEvent } = props

  return (childProps: AnyObj = {}) => {
    const value = instance.getFieldValue(name)

    const injectProps = {
      ...childProps,
      ...control._id ? getValueProps!(value) : null,
      // 触发条件
      [trigger!]: (...args: any[]) => {
        let next = getValueFromEvent!(...args)

        if (isFunction(formatter)) {
          next = formatter(next, value, () => instance.getFieldsValue(true))
        }

        if (next !== value) {
          internalHooks.dispatch({ type: 'fieldEvent', control, value: next })
        }

        trigger && childProps[trigger]?.(...args)
      },
    }

    // 校验触发时机
    const triggerList = toArray(fallback(validateTrigger, formContext.validateTrigger))

    return triggerList.reduce((result, triggerName) => {
      if (triggerName === false) return result

      result[triggerName] = (...args: any[]) => {
        injectProps[triggerName]?.(...args)
        rule && instance.validateField(name)
      }

      return result
    }, { ...injectProps })
  }
}

function getFormatFunction(
  handleCollect: () => AnyObj,
  instance: InternalFormInstance,
  control: FormFieldControl,
) {
  return function normalizeInner(children: InternalFormFieldProps['children']): {
    children: ReactNode
    functional?: true
    valid: boolean
  } {
    if (isFunction(children)) {
      const element = children(handleCollect(), control.getMetaData(), instance)
      return { ...normalizeInner(element as ReactElement), functional: true }
    }

    // 去除 fragment，nullish 后
    const childList = flattenChildren(children)

    // Form.Field 直接包裹的元素，且是 合法的 reactELement
    if (childList.length === 1 && isValidElement(childList[0])) {
      return { children: childList[0], valid: true }
    }

    return { children: childList, valid: false }
  }
}

// 处理 children
export function normalizeChildren(
  internalHooks: InternalHooksReturn,
  formContext: InternalFormContextState,
  instance: InternalFormInstance,
  control: FormFieldControl,
  props: InternalFormFieldProps,
) {
  // 收集子组件的数据
  const handleCollect = getCollectFunction(internalHooks, formContext, instance, control, props)

  // 处理 children
  const handleFormat = getFormatFunction(handleCollect, instance, control)

  const { children, functional, valid } = handleFormat(props.children)

  if (process.env.NODE_ENV !== 'production') {
    logger(!functional && !valid, 'Form.Field `children` is not valid react element.')
  }

  if (functional || !valid) return children

  const collected = handleCollect((children as ReactElement).props)

  return cloneElement(children as ReactElement, collected)
}
