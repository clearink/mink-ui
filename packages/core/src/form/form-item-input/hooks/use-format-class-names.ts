import type { ValidateStatus } from '../../_shared.props'
import type { FormItemInputProps } from '../props'

import { cls } from '../../../_shared/utils'

export default function useFormatClassNames(
  prefixCls: string,
  status: undefined | ValidateStatus,
  wrapperCol: FormItemInputProps['wrapperCol'] = {},
) {
  return {
    root: cls(
      prefixCls,
      {
        [`${prefixCls}--has-${status}`]: !!status,
      },
      wrapperCol.className,
    ),
  }
}
