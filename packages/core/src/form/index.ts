import { List as InternalList, useWatch } from '@mink-ui/core/_shared/components'

import _Form from './form'
import useForm from './form/hooks/use-form'
import useFormInstance from './form/hooks/use-form-instance'
import FormErrorList from './form-error-list'
import FormItem from './form-item'
import useFormItemStatus from './form-item/hooks/use-item-status'

// CompoundedForm
const Form = Object.assign(_Form, {
  ErrorList: FormErrorList,
  Item: Object.assign(FormItem, { useStatus: useFormItemStatus }),
  List: InternalList,
  useForm,
  useFormInstance,
  useWatch,
})

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                    export definition                    |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export type { FormInstance, FormProps } from './form/props'
export type { FormErrorListProps } from './form-error-list/props'
export type { FormItemProps } from './form-item/props'
export type { InternalFormListProps as FormListProps } from '@mink-ui/core/_shared/components'

export { Form }
export default Form
