import { useWatch } from '../_shared/components'
import _Form from './form'
import useForm from './form/hooks/use-form'
import useFormInstance from './form/hooks/use-form-instance'
import FormErrorList from './form-error-list'
import FormItem from './form-item'
import useFormItemStatus from './form-item/hooks/use-item-status'
import FormList from './form-list'

// CompoundedForm
const Form = Object.assign(_Form, {
  ErrorList: FormErrorList,
  Item: Object.assign(FormItem, { useStatus: useFormItemStatus }),
  List: FormList,
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

export type { InternalFormListProps as FormListProps } from '../_shared/components'
export type { FormInstance, FormProps } from './form/props'
export type { FormErrorListProps } from './form-error-list/props'
export type { FormItemProps } from './form-item/props'

export { Form }
export default Form
