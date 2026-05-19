import type { ButtonProps } from '../button.props'

import { isObject } from '@mink-ui/shared/is/is-object'

export function normalizeLoadingOptions(loading: ButtonProps['loading']) {
  const isObjectLoading = isObject(loading)

  const delay = isObjectLoading ? Number(loading.delay) || 0 : 0

  return {
    icon: isObjectLoading ? loading.icon : undefined,
    delay,
    loading: isObjectLoading ? delay <= 0 : !!loading,
  }
}
