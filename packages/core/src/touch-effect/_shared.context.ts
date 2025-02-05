import type { TouchEffectInfo } from './_shared.props'

import { ctxHelper } from '../_shared/utils'

export interface TouchEffectState {
  disabled?: ((info: TouchEffectInfo) => boolean) | boolean
  showEffect?: (info: TouchEffectInfo) => void
}

export const TouchEffectContext = ctxHelper<TouchEffectState>({}, 'TouchEffectContext')
