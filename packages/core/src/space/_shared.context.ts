import { ctxHelper } from '../_shared/utils'

export interface SpaceContextState {}

// TODO: 可以自定义组件的间隔大小
export const SpaceContext = ctxHelper<SpaceContextState>({}, 'SpaceContext')
