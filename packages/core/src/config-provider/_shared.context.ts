import { ctxHelper } from '@mink-ui/core/_shared/utils'

import type { ConfigProviderProps } from './config-provider/props'

export const ConfigContext = ctxHelper<ConfigProviderProps>({}, 'ConfigContext')

export type DisabledType = false | true | undefined

export const DisabledContext = ctxHelper<DisabledType>(undefined, 'DisabledContext')

export type SizeType = 'large' | 'middle' | 'small'

export const SizeContext = ctxHelper<SizeType | undefined>('middle', 'SizeContext')

export interface ZIndexContextState {
  getZIndex: () => number
}

let baseZIndex = 2000
export const ZIndexContext = ctxHelper<ZIndexContextState>({
  getZIndex: () => baseZIndex++,
}, 'ZIndexContext')
