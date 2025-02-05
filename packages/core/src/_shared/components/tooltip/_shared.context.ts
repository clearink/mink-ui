import { noop } from '@mink-ui/shared'

import { ctxHelper } from '../../../_shared/utils'

export interface InternalToolTipContextState {
  (el: Element | null): () => void
}

// 嵌套时的逻辑
export const InternalToolTipContext = ctxHelper<InternalToolTipContextState>(() => noop, 'InternalToolTipContext')
