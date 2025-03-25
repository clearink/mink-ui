import { useCallback } from 'react'

import type { MetaChangeEvent } from '../../_shared.props'

import { useDebounceState } from '../../../_shared/hooks'

export function initFieldMeta(): MetaChangeEvent {
  return {
    dirty: false,
    errors: [],
    mounted: false,
    name: [],
    touched: false,
    validating: false,
    warnings: [],
    validated: false,
  }
}

export default function useMetaState() {
  const [state, setState] = useDebounceState(80, initFieldMeta)

  const update = useCallback((meta: MetaChangeEvent) => {
    meta.mounted && setState(meta)
  }, [setState])

  return [state, update] as const
}
