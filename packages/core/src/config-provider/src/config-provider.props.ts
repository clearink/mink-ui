import type { HasChildren } from '../../_shared/types/has-children'
import type { GlobalConfig } from './_shared.props'

import { exhaustive } from '../../_shared/utils/exhaustive'

export interface ConfigProviderInjectedProps extends HasChildren {}

export interface ConfigProviderProps extends ConfigProviderInjectedProps, GlobalConfig {}

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultConfigProviderProps: Partial<ConfigProviderProps> = {
  rootPrefixCls: 'mink',
  iconPrefixCls: 'minkicon',
}

export const excludedConfigProviderProps = exhaustive<keyof ConfigProviderInjectedProps>()([
  'children',
])
