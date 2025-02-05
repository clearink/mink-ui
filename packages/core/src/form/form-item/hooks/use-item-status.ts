import { logger } from '@mink-ui/core/_shared/utils'
import { isUndefined } from '@mink-ui/shared'

import { FormItemContext } from '../../_shared.context'

export default function useFormItemStatus() {
  const { validateStatus } = FormItemContext.useState()

  if (process.env.NODE_ENV !== 'production') {
    logger(
      isUndefined(validateStatus),
      'Form.Item',
      'Form.Item.useStatus should be used under Form.Item component',
    )
  }

  return validateStatus
}
