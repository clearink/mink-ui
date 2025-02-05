import type { MayBe } from '@mink-ui/shared'

import { observe, shallowEqual } from '@mink-ui/shared'
import { useEffect, useRef } from 'react'

import { type GetTargetElement, getTargetElement } from '../../../_shared/utils'
import { useEvent } from '../use-event'

export function useResizeObserver<T extends Element>(
  target: GetTargetElement<T>,
  handler: (el: Element) => void,
) {
  const callback = useEvent(handler)

  const previousElement = useRef<MayBe<T>>(null)

  useEffect(() => () => {
    previousElement.current = null
  }, [])

  useEffect(() => {
    const targetElement = getTargetElement(target)

    if (shallowEqual(targetElement, previousElement.current)) {
      return
    }

    previousElement.current = targetElement

    if (targetElement) return observe(targetElement, callback)
  }, [callback, target])
}
