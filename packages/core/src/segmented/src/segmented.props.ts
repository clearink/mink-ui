import type { HasSemanticsStyled } from '../../_shared/types/has-semantics'
import type { Orientation } from '../../_shared/types/orientation'
import type { CommonSize } from '../../_shared/types/size'
import type { SegmentedOptionType, SegmentedValue } from './_shared.props'

export interface SegmentedProps extends
  HasSemanticsStyled<'root' | 'inner' | 'item' | 'thumb', SegmentedProps> {
  /**
   * @description 选项数据
   */
  options: SegmentedOptionType[]

  /**
   * @description 当前选中的值
   */
  value?: SegmentedValue

  /**
   * @description 默认选中的值
   */
  defaultValue?: SegmentedValue

  /**
   * @description 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * @description 元素尺寸
   */
  size?: CommonSize

  /**
   * @description 是否为块级元素
   */
  block?: boolean

  /**
   * @description 方向
   */
  orientation?: Orientation

  /**
   * @description 选项变化时的回调函数
   */
  onChange?: (value: SegmentedValue) => void
}

export type DefaultNames = 'block' | 'size'

export type PickedSegmentedProps = Pick<SegmentedProps, DefaultNames>

export type OmittedSegmentedProps = Omit<SegmentedProps, DefaultNames>

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultSegmentedProps: PickedSegmentedProps = {
  block: false,
  size: 'middle',
}
