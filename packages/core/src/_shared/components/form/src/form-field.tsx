import type { GeneratedFormFieldProps, GeneratedFormListProps, InternalFormFieldProps } from './form-field.props'

import { Fragment } from 'react'

import { defineName } from '../../../utils/define-name'
import { useInternalFormFieldProps, useInternalGeneratedProps } from './hooks/use-form-field-props'
import { normalizeFieldChildren } from './utils/children'

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

function GeneratedFormField<V = any>(props: GeneratedFormFieldProps<V>) {
  const generated = useInternalGeneratedProps(props, false)

  return (
    <InternalFormField
      {...props}
      {...generated}
    />
  )
}

function GeneratedFormList<V = any>(props: GeneratedFormListProps<V>) {
  const generated = useInternalGeneratedProps(props, true)

  return (
    <InternalFormField
      {...props}
      {...generated}
    />
  )
}

defineName(InternalFormField, 'InternalForm.Field')

export { GeneratedFormField, GeneratedFormList }
