import type { MayBe } from '@mink-ui/shared'

import { useEffect, useState } from 'react'

import { type GetTargetElement, getTargetElement } from '../../../_shared/utils'
import { useEvent } from '../use-event'

export default function useClickOutside<T extends Element>(
  target: GetTargetElement<T>,
  handler: (event: FocusEvent | PointerEvent) => void,
) {
  const callback = useEvent(handler)

  const [el, set] = useState<MayBe<T>>(null)

  useEffect(() => { set(getTargetElement(target)) }, [target])

  useEffect(() => {
    if (!el) return
    console.log(el)
    // TODO...
  }, [el, callback])
}
