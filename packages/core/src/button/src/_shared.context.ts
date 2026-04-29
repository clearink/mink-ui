import { ctxHelper } from '../../_shared/utils/ctx-helper'

export interface ButtonGroupContextState {
  disabled?: boolean
}

export const ButtonGroupContext = ctxHelper<ButtonGroupContextState>('ButtonGroupContext', {})
