/* eslint-disable react/component-hook-factories */
/* eslint-disable react-refresh/only-export-components */
import type { GeneratedFormFieldProps, GeneratedFormListProps, InternalFormFieldProps } from './form-field.props'

import { Fragment } from 'react'
import { toArray } from '@mink-ui/shared/array/to-array'

import { defineName } from '../../../utils/define-name'
import { logger } from '../../../utils/logger'
import { InternalFormListContext } from './_shared.context'
import { useInternalFormFieldProps } from './hooks/use-form-field-props'
import { normalizeFieldChildren } from './utils/children'
import { normalizeIsListField } from './utils/helpers'
import { _getId } from './utils/path'

function InternalFormField(props: InternalFormFieldProps) {
  const {
    picked,
    omitted,
    control,
    refreshCount,
    formInstance,
    internalHooks,
    returnEmpty,
  } = useInternalFormFieldProps(props)

  if (returnEmpty) return null

  return (
    <Fragment key={refreshCount}>
      {normalizeFieldChildren(internalHooks, formInstance, control, picked, omitted)}
    </Fragment>
  )
}

function generateComponent<T extends boolean>({ isFormList }: { isFormList: T }) {
  type GeneratedProps<V> = T extends true ? GeneratedFormListProps<V> : GeneratedFormFieldProps<V>

  function GeneratedComponent<V = any>(props: GeneratedProps<V>) {
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

    return (
      <InternalFormField
        key={isListField ? 'controlled' : _getId(fieldName)}
        {...props}
        isFormList={isFormList ? { listControl } : false}
        isListField={isListField}
        name={fieldName}
      />
    )
  }

  defineName(GeneratedComponent, 'InternalForm.Field')

  return GeneratedComponent
}

export const Field = generateComponent({ isFormList: false })

export const List = generateComponent({ isFormList: true })
