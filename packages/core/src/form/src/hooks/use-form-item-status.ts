import { isUndefined } from '@mink-ui/shared/is/is-undefined'

import { logger } from '../../../_shared/utils/logger'
import { FormItemStatusContext } from '../_shared.context'

export function useFormItemStatus() {
  const { status, warnings = [], errors = [] } = FormItemStatusContext.use()

  if (process.env.NODE_ENV !== 'production') {
    if (isUndefined(status)) {
      logger.error(
        'Form.Item',
        'Form.Item.useStatus should be used under Form.Item component',
      )
    }
  }

  return { status, warnings, errors }
}
