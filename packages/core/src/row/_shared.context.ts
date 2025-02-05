import { ctxHelper } from '../_shared/utils'

// row 组件传递数据给 col 组件
export type RowContextState = number

export const RowContext = ctxHelper<RowContextState>(0, 'RowContext')
