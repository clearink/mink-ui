import { useWatch } from '../../_shared/components/form/src'
import _Form from './form'
import FormErrorList from './form-error-list'
import FormItem from './form-item'
import FormList from './form-list'
import { useForm } from './hooks/use-form'
import { useFormInstance } from './hooks/use-form-instance'
import { useFormItemStatus } from './hooks/use-form-item-status'

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

export type { FormErrorListProps } from './form-error-list.props'
export type { FormItemProps } from './form-item.props'
export type { FormListProps } from './form-list.props'
export type { FormProps } from './form.props'

export { Form }
export default Form
