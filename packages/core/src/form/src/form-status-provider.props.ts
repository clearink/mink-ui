import type { HasChildren } from '../../_shared/types'
import type { FieldName } from './_shared.props'

export interface FormInputProviderProps extends HasChildren {
  pure?: boolean
  name?: FieldName
}
