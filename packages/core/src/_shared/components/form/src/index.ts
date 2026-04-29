import { InternalFormInstanceContext, InternalFormListContext } from './_shared.context'
import _Form from './form'
import { Field } from './form-field'
import List from './form-list'
import FormProvider from './form-provider'
import FormShared from './form-shared'
import { useForm } from './hooks/use-form'
import { useWatch } from './hooks/use-watch'
import { normalizeIsListField } from './utils/helpers'
import { _getId } from './utils/path'

// CompoundedForm
const Form = Object.assign(_Form, {
  FormProvider,
  FormShared,
  Field,
  List,
  useForm,
  useWatch,
})

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                    export definition                    |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export type { ExternalFieldInfo, ExternalFieldName, ExternalFormInstance, InternalMetaInfo, MetaChangeEvent } from './_shared.props'
export type { GeneratedFormFieldProps as InternalFormFieldProps } from './form-field.props'
export type { InternalFormListProps, InternalListField, InternalListHelpers } from './form-list.props'
export type { InternalFormProps } from './form.props'

export {
  _getId,
  Field,
  Form,
  FormProvider,
  FormShared,
  InternalFormInstanceContext,
  InternalFormListContext,
  List,
  normalizeIsListField,
  useForm,
  useWatch,
}

export default Form
