import { noop } from '@mink-ui/shared'

import type { CheckboxOptionType } from './checkbox/props'

import { ctxHelper } from '../_shared/utils'

export interface CheckboxGroupContextState {
  cancelValue: (val: string) => void
  disabled?: boolean
  name?: string
  registerValue: (val: string) => void
  toggleOption?: (option: CheckboxOptionType) => void
  value?: any
}
export const CheckboxGroupContext = ctxHelper<CheckboxGroupContextState>(
  {
    cancelValue: noop,
    registerValue: noop,
  },
  'CheckboxGroupContext',
)
