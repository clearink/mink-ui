import type { ColProps } from '@mink-ui/core/col'

import type { FormLabelAlign, RequiredMark } from '../_shared.props'

export interface FormItemLabelProps {
  colon?: boolean
  htmlFor?: string
  label?: React.ReactNode
  labelAlign?: FormLabelAlign
  labelCol?: ColProps
  labelWrap?: boolean
  // extra
  required?: boolean
  requiredMark?: RequiredMark

  // TODO: 待完善
  tooltip?: any
}
