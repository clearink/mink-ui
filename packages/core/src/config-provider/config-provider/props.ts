import type { HasClosable, StyledProps } from '@mink-ui/core/_shared/types'
import type { AlertProps } from '@mink-ui/core/alert'
import type { ModalProps } from '@mink-ui/core/modal'
import type { SpaceProps } from '@mink-ui/core/space'
import type { TouchEffectState } from '@mink-ui/core/touch-effect/_shared.context'
import type { ReactNode } from 'react'

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
