import type { SVGAttributes } from 'react'

export interface IconProps extends SVGAttributes<SVGElement> {}

export interface IconMetaInfo {
  theme: 'filled' | 'outlined' | 'twotone'
  name: string
}

export interface IconConfig {
  /**
   * @description 公共 className 前缀
   */
  prefixCls?: string

  /**
   * @description 公共 viewBox
   */
  viewBox?: string
}
