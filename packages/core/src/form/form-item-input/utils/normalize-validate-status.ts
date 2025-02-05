import { isNullish } from '@mink-ui/shared'

import type { FieldMeta, ValidateStatus } from '../../_shared.props'

export default function normalizeValidateStatus(
  meta: FieldMeta,
  status: undefined | ValidateStatus,
): undefined | ValidateStatus {
  if (!isNullish(status)) return status

  if (meta.validating) return 'validating'

  if (meta.validating) return 'validating'

  if (meta.errors.length) return 'error'

  if (meta.warnings.length) return 'warning'

  if (meta.touched) return 'success'
}
