import type { GetLayerLevel, HasChildren } from '../../_shared/types'
import type { GlobalConfig } from './_shared.props'

export interface ConfigProviderProps extends HasChildren, Omit<GlobalConfig, 'layerLevel'> {
  /**
   * @description z-index 自定义
   */
  getLayerLevel?: GetLayerLevel
}

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const includedGlobalConfigNames = [
  'size',
  'disabled',
  'getLayerLevel',
  'rootPrefixCls',
  'iconPrefixCls',
  'touchEffect',
  'button',
  'form',
  'space',
  'tooltip',
  'alert',
] as const
