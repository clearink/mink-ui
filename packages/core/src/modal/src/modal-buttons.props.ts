import type { ButtonProps } from '../../button/src'

export type DefaultCancelNames = 'children'

export type DefaultConfirmNames = 'children' | 'theme' | 'variant'

export type PickedCancelButtonProps = Pick<ButtonProps, DefaultCancelNames>

export type PickedConfirmButtonProps = Pick<ButtonProps, DefaultConfirmNames>

export const defaultCancelButtonProps: PickedCancelButtonProps = {
  children: 'Cancel',
}

export const defaultConfirmButtonProps: PickedConfirmButtonProps = {
  children: 'Confirm',
  theme: 'primary',
  variant: 'solid',
}
