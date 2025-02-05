import type { ReactNode } from 'react'

import type { HasClosable, StyledProps } from '../../_shared/types'
import type { AlertProps } from '../../alert'
import type { ModalProps } from '../../modal'
import type { SpaceProps } from '../../space'
import type { TouchEffectState } from '../../touch-effect/_shared.context'
import type { SizeType } from '../_shared.context'

export interface ConfigProviderProps {
  children?: ReactNode
  prefixCls?: string
  size?: SizeType
  space?: Pick<SpaceProps, 'className' | 'classNames' | 'size' | 'style' | 'styles'>
  touchEffect?: TouchEffectState

  alert?: Pick<AlertProps, keyof HasClosable> & StyledProps

  modal?: Pick<ModalProps, keyof HasClosable> & StyledProps

}
