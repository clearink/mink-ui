import type { OmittedButtonProps } from '../button.props'

import { useEffect, useState } from 'react'
import { makeTimeout } from '@mink-ui/shared/dom/timer'

import { normalizeLoadingOptions } from '../utils/format'

export function useButtonLoading(omitted: OmittedButtonProps) {
  const { loading } = omitted

  const loadingOptions = normalizeLoadingOptions(loading)

  const [isLoading, setIsLoading] = useState(loadingOptions.loading)

  useEffect(() => {
    const delay = loadingOptions.delay

    if (delay <= 0) setIsLoading(loadingOptions.loading)
    else return makeTimeout(delay, () => { setIsLoading(true) })
  }, [loadingOptions.loading, loadingOptions.delay])

  return {
    isLoading,
    loadingOptions,
  }
}
