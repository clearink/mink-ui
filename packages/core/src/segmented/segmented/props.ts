import type { SemanticStyledProps } from '@mink-ui/core/_shared/types'
import type { SizeType } from '@mink-ui/core/config-provider/_shared.context'

export type SegmentedType = number | string

export interface SegmentedOption<T = SegmentedType> extends SemanticStyledProps<'label' | 'root'> {
  disabled?: boolean
  label: React.ReactNode
  title?: string
  value: T
}

export interface SegmentedProps<T = SegmentedType>
  extends SemanticStyledProps<'group' | 'root' | 'thumb'> {
  block?: boolean

  defaultValue?: T

  disabled?: boolean

  onChange?: (value: T) => void

  options: (SegmentedOption<T> | T)[]

  size?: SizeType

  value?: T
}

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                      default props                      |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultSegmentedProps: Partial<SegmentedProps> = {
  block: false,
}
