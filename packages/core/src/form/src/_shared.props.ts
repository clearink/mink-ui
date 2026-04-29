import type { ExternalFormInstance, MetaChangeEvent } from '../../_shared/components/form/src'
import type { ExternalFieldName } from '../../_shared/components/form/src/_shared.props'

export type FieldName = ExternalFieldName

export type { MetaChangeEvent }

export type LabelAlign = 'left' | 'right'

export type ValidateStatus = '' | 'error' | 'success' | 'validating' | 'warning'

export type RequiredMark = 'optional' | boolean

export type FormLayout = 'horizontal' | 'inline' | 'vertical'

export type FormVariant = 'outlined' | 'borderless' | 'filled' | 'underlined'

export interface FormInstance<S = any> extends ExternalFormInstance<S> {
  scrollToField: (name: FieldName) => void
}

export type MetaChangeHandler = (event: MetaChangeEvent) => void
