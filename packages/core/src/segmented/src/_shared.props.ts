import type { ReactNode, Ref } from 'react'
import type { GetSemanticsConfig } from '../../_shared/types/has-semantics'
import type { SegmentedProps } from './segmented.props'

export type SegmentedValue = string | number

export interface SegmentedOptionType {
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

/**
 * |---------------------------------------------------------|
 * |                     global definition                   |
 * |---------------------------------------------------------|
 */

export interface SegmentedGlobalConfig extends GetSemanticsConfig<SegmentedProps>,
  Pick<SegmentedProps, 'size'> {}
