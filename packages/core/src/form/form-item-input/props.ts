import type { ReactNode } from 'react'

import type { ColProps } from '../../col'
import type { MetaChangeEvent, ValidateStatus } from '../_shared.props'

export type MetaChangeHandler = (meta: MetaChangeEvent) => void

export interface FormItemInputProps {
  children: (onMetaChange: MetaChangeHandler, onSubMetaChange: MetaChangeHandler) => ReactNode
  extra?: ReactNode
  getOuter: () => HTMLDivElement | null

  help?: ReactNode
  // extra
  validateStatus?: ValidateStatus
  wrapperCol?: ColProps
}
