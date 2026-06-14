import type { CSSProperties } from 'react'
import type { GetSemanticsValues, HasSemanticsStyled } from '../../_shared/types/has-semantics'
import type { SegmentedOptionType, SegmentedValue } from './_shared.props'
import type { SegmentedProps } from './segmented.props'

export interface SegmentedItemInjectedProps extends
  HasSemanticsStyled<'root' | 'label', SegmentedItemProps> {
  /**
   * @description 配置项
   */
  option: SegmentedOptionType

  /**
   * @description 是否选中
   */
  checked: boolean

  /**
   * @description 是否禁用
   */
  disabled: boolean | undefined

  /**
   * @description 是否展示 thumb
   */
  isShowThumb?: boolean

  /**
   * @description 外部命名空间
   */
  outerNamespace: string

  /**
   * @description 外部样式类名
   */
  outerCssNames: Omit<GetSemanticsValues<SegmentedProps, string>, 'item' | 'inner'>

  /**
   * @description 外部样式属性
   */
  outerCssAttrs: Omit<GetSemanticsValues<SegmentedProps, CSSProperties>, 'item' | 'inner'>

  /**
   * @description 选中时回调
   */
  onChange: (value: SegmentedValue) => void

  /**
   * @description 收集 DOM 元素
   */
  onCollect: (el: HTMLElement | null, option: SegmentedOptionType) => void
}

export interface SegmentedItemProps extends SegmentedItemInjectedProps {}
