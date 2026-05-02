import type { HasChildren } from '../../../types/has-children'
import type { InternalFormProps } from './form.props'

export interface InternalFormSharedProps extends
  HasChildren,
  Pick<InternalFormProps, 'validateMessages'> {
}
