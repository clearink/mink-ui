import type { CSSProperties, ReactNode, Ref } from 'react'
import type { GetSemanticsValues, SemanticsStyled } from '../../_shared/types/styled'
import type { SegmentedOption, SegmentedValue } from './_shared.props'
import type { SegmentedProps } from './segmented.props'

export interface SegmentedItemConfig {
  /**
   * @description 外部引用
   */
  ref?: Ref<HTMLLabelElement>

  /**
   * @description 选项文本
   */
  label: ReactNode

  /**
   * @description html-title
   */
  title?: string

  /**
   * @description 选项值
   */
  value: SegmentedValue

  /**
   * @description 是否禁用
   */
  disabled?: boolean
}

export interface SegmentedItemProps extends
  SemanticsStyled<'root' | 'label'> {
  /**
   * @description 培训项
   */
  config: SegmentedItemConfig

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
  onCollect: (el: HTMLElement | null, item: SegmentedOption) => void
}
