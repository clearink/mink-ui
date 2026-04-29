import type { HTMLAttributes } from 'react'
import type { CommonSize, Orientation, SemanticsStyled } from '../../_shared/types'
import type { SegmentedOption, SegmentedValue } from './_shared.props'

export interface SegmentedProps extends
  Omit<HTMLAttributes<HTMLDivElement>, 'value' | 'defaultValue' | 'onChange'>,
  SemanticsStyled<'root' | 'inner' | 'item' | 'thumb'> {

  /**
   * @description 选项数据
   */
  options: SegmentedOption[]

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
  oreientation?: Orientation

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
