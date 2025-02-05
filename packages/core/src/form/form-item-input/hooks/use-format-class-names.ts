import { cls } from '@mink-ui/core/_shared/utils'

import type { ValidateStatus } from '../../_shared.props'
import type { FormItemInputProps } from '../props'

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
