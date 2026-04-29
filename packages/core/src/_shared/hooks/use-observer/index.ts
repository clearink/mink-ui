import type { MayBe } from '@mink-ui/shared/interface'
import type { GetContainerElement } from '../../components/portal/src/_shared.props'

import { useEffect } from 'react'
import { noop } from '@mink-ui/shared/function/noop'
import { shallowEqual } from '@mink-ui/shared/object/shallow-equal'

import { findContainerElement } from '../../utils/element'
import { useConstant } from '../use-constant'
import { useEvent } from '../use-event'
import observer from './utils/observer'

class ObserverRefs<T extends Element> {
  public cleanup = noop

  public element = null as MayBe<T>

  public dispose = () => {
    this.cleanup()
    this.element = null
    this.cleanup = noop
  }
}

export function useResizeObserver<T extends Element>(
  container: GetContainerElement<T>,
  handler: (el: Element) => void,
) {
  const refs = useConstant(() => new ObserverRefs<T>())

  const callback = useEvent(handler)

  useEffect(() => () => { refs.dispose() }, [refs])

  useEffect(() => {
    const element = findContainerElement(container)

    if (shallowEqual(element, refs.element)) return

    refs.cleanup()

    refs.element = element

    refs.cleanup = element ? observer.observe(element, callback) : noop
  }, [refs, container, callback])
}
