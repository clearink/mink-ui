import type { MayBe } from '@mink-ui/shared'
import type { ReactRef } from '../../types'

import { useMemo } from 'react'

import { isNullish } from '@mink-ui/shared'

import { mergeRefs } from '../../utils'

export function useComposeRefs<T>(...refs: MayBe<ReactRef<T>>[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => (refs.every(isNullish) ? null : mergeRefs(...refs)), refs)
}
