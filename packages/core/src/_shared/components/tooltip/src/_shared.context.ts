import type { VoidFn } from '@mink-ui/shared/interface'

import { noop } from '@mink-ui/shared/function/noop'

import { ctxHelper } from '../../../utils/ctx-helper'

export interface InternalTooltipContextState {
  (el: Element | null): VoidFn
}

export const InternalTooltipContext = ctxHelper<InternalTooltipContextState>('InternalTooltipContext', () => noop)
