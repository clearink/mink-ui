import type { ReactRef } from '@mink-ui/core/_shared/types'
import type { MayBe } from '@mink-ui/shared'

import { mergeRefs } from '@mink-ui/core/_shared/utils'
import { isNullish } from '@mink-ui/shared'
import { useMemo } from 'react'

export function useComposeRefs<T>(...refs: MayBe<ReactRef<T>>[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => (refs.every(isNullish) ? null : mergeRefs(...refs)), refs)
}
