import { ctxHelper } from '@mink-ui/core/_shared/utils'
import { noop } from '@mink-ui/shared'

export interface InternalToolTipContextState {
  (el: Element | null): () => void
}

// 嵌套时的逻辑
export const InternalToolTipContext = ctxHelper<InternalToolTipContextState>(() => noop, 'InternalToolTipContext')
