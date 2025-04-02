import { fallback, isUndefined, toArray } from '@mink-ui/shared'
import { Fragment, useMemo } from 'react'
import isEqual from 'react-fast-compare'

import type { ExternalFormFieldProps, InternalFormFieldProps } from './props'

import { betterDisplayName, logger, withDefaults } from '../../../../_shared/utils'
import { useWatchValue } from '../../../hooks'
import { InternalFormContext, InternalFormInstanceContext, InternalFormListContext } from '../_shared.context'
import { HOOK_MARK } from '../form/control'
import { _getId } from '../utils/path'
import useFieldBootstrap from './hooks/use-field-bootstrap'
import { defaultInternalFormFieldProps } from './props'
import { normalizeChildren } from './utils/children'
import { defaultGetValueFromEvent, defaultGetValueProps } from './utils/getter'

function _InternalFormField(_props: InternalFormFieldProps) {
  const props = useMemo(() => {
    const valuePropName = fallback(_props.valuePropName, defaultInternalFormFieldProps.valuePropName)!
    return withDefaults(_props, {
      ...defaultInternalFormFieldProps,
      getValueProps: defaultGetValueProps(valuePropName),
      getValueFromEvent: defaultGetValueFromEvent(valuePropName),
    })
  }, [_props])

  const { name, dependencies } = props

  // 表单实例
  const instance = InternalFormInstanceContext.useState()
  // 表单上下文
  const formContext = InternalFormContext.useState()

  const internalHooks = useMemo(() => instance.getInternalHooks(HOOK_MARK)!, [instance])

  const [control, refreshCount] = useFieldBootstrap(internalHooks, instance, props)

  // 监听 name 变化
  const returnEarly1 = useWatchValue(name, {
    compare: isEqual,
    listener: (_, prev) => { internalHooks.updateControlsMap(control, prev) },
  })

  // 监听 dependencies 变化
  const returnEarly2 = useWatchValue(dependencies, {
    compare: isEqual,
    listener: () => { internalHooks.updateDependencies(control) },
  })

  if (returnEarly1 || returnEarly2) return null

  return (
    <Fragment key={refreshCount}>
      {normalizeChildren(internalHooks, formContext, instance, control, props)}
    </Fragment>
  )
}

function InternalFormField(props: ExternalFormFieldProps) {
  const { name, preserve } = props

  const listContext = InternalFormListContext.useState()

  const listPath = listContext?.listPath || []

  const listControl = listContext?.listControl

  const arrayName = toArray(name)

  const fieldName = isUndefined(name) ? [] : listPath.concat(arrayName)

  let isListField: InternalFormFieldProps['isListField']

  if (!listContext) isListField = false
  else if (listPath.length === 0) isListField = false
  else if (arrayName.length === 0) isListField = false
  else if (arrayName.length > 1) isListField = { type: 'complex', listPath, listControl }
  else isListField = { type: 'simple', listPath, listControl }

  if (process.env.NODE_ENV !== 'production') {
    logger(
      preserve === false && isListField && isListField.type === 'simple',
      '`preserve` should not apply on Form.List direct field.',
    )
  }

  return (
    <_InternalFormField
      {...props}
      // 是列表字段时, 需要固定一个 key, 保证列表字段不会频繁的卸载和挂载
      key={isListField ? 'controlled' : _getId(fieldName)}
      isListField={isListField}
      // 列表字段刷新时, 直接刷新整个 _InternalFormField
      name={fieldName}
    />
  )
}

betterDisplayName(InternalFormField, 'InternalForm.Field')

export default InternalFormField
