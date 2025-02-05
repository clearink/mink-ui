import Field from './field'
import InternalForm from './form'
import useForm from './form/hooks/use-form'
import useWatch from './form/hooks/use-watch'
import List from './list'
import Provider from './provider'

// CompoundedForm
const Form = Object.assign(InternalForm, {
  Field,
  List,
  Provider,
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

export type { ExternalFieldData, ExternalFieldMeta, ExternalNamePath } from './_shared.props'
export type * from './field/props'
export type * from './form/control/props'
export type * from './form/props'
export type * from './list/control/props'
export type * from './list/props'
export type * from './provider/props'

export { Field, Form, List, Provider, useForm, useWatch }

export default Form
