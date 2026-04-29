import type { CSSProperties, ReactNode, Ref } from 'react'
import type { SemanticsStyled } from '../../_shared/types'
import type { GetSemanticsValues } from '../../_shared/types/styled'
import type { SegmentedValue } from './_shared.props'
import type { SegmentedProps } from './segmented.props'

export interface SegmentedItemProps extends
  SemanticsStyled<'root' | 'label'> {

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

  /**
   * @description 是否选中
   */
  checked?: boolean

  /**
   * @description 是否展示 thumb
   */
  isShowThumb?: boolean

  /**
   * @description 根节点命名空间
   */
  rootNamespace: string

  /**
   * @description 根节点样式名称
   */
  rootCssNames: Omit<GetSemanticsValues<SegmentedProps, string>, 'item' | 'inner'>

  /**
   * @description 根节点样式属性
   */
  rootCssAttrs: Omit<GetSemanticsValues<SegmentedProps, CSSProperties>, 'item' | 'inner'>

  /**
   * @description 选中时回调
   */
  onChange?: (value: SegmentedValue) => void
}
