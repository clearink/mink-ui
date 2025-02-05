import { ctxHelper } from '@mink-ui/core/_shared/utils'

export interface ButtonGroupContextState {
  disabled?: boolean
}

export const ButtonGroupContext = ctxHelper<ButtonGroupContextState>({}, 'ButtonGroupContext')
