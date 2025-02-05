import type { MayBe } from '@mink-ui/shared'

import { isNullish } from '@mink-ui/shared'
import { useMemo } from 'react'

import type { ReactRef } from '../../../_shared/types'

import { mergeRefs } from '../../../_shared/utils'

export function useComposeRefs<T>(...refs: MayBe<ReactRef<T>>[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => (refs.every(isNullish) ? null : mergeRefs(...refs)), refs)
}
