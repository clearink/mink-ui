import type { ButtonProps } from '../button/props'

export function isBorderedVariant(variant: ButtonProps['variant']) {
  return variant !== 'link' && variant !== 'text'
}
