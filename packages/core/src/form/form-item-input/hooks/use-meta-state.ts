import { useCallback } from 'react'

import type { FieldMeta } from '../../_shared.props'

import { useDebounceState } from '../../../_shared/hooks'

export function initFieldMeta(): FieldMeta {
  return {
    dirty: false,
    errors: [],
    mounted: false,
    name: [],
    touched: false,
    validating: false,
    warnings: [],
  }
}

export default function useMetaState() {
  const [state, setState] = useDebounceState(80, initFieldMeta)

  const update = useCallback((meta: FieldMeta) => {
    meta.mounted && setState(meta)
  }, [setState])

  return [state, update] as const
}
