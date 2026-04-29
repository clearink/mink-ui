import type { MayBe } from '@mink-ui/shared'
import type { GetTargetElement } from '../../utils'

import { useEffect } from 'react'

import { getTargetElement } from '../../utils'
import { useEvent } from '../use-event'
import { useExactState } from '../use-exact-state'

export default function useClickOutside<T extends Element>(
  target: GetTargetElement<T>,
  handler: (event: FocusEvent | PointerEvent) => void,
) {
  const callback = useEvent(handler)

  const [el, set] = useExactState<MayBe<T>>(null)

  useEffect(() => set(getTargetElement(target)), [set, target])

  useEffect(() => {
    if (!el) return
    console.log(el)
    // TODO...
  }, [el, callback])
}
