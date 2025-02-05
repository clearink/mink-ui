import type { ColProps } from '@mink-ui/core/col'
import type { ReactNode } from 'react'

import type { FieldMeta, ValidateStatus } from '../_shared.props'

export interface FormItemInputProps {
  children: (
    onMetaChange: (meta: FieldMeta) => void,
    onSubMetaChange: (meta: FieldMeta) => void,
  ) => ReactNode
  extra?: ReactNode
  getOuter: () => HTMLDivElement | null

  help?: ReactNode
  // extra
  validateStatus?: ValidateStatus
  wrapperCol?: ColProps
}
