import type { GutterValue } from './_shared.props'

import { ctxHelper } from '../../_shared/utils/ctx-helper'

export interface RowGutterContextState {
  gutter?: GutterValue
  wrap?: boolean
}

export const RowGutterContext = ctxHelper<RowGutterContextState>('RowGutterContext', {})
