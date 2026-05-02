import type { CheckboxProps } from './checkbox.props'

import { ctxHelper } from '../../_shared/utils/ctx-helper'

export interface CheckboxGroupContextState extends Pick<CheckboxProps, 'disabled'> {
}

export const CheckboxGroupContext = ctxHelper<CheckboxGroupContextState>('CheckboxGroupContext', {})
