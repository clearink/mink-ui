import type { GetContainerElement } from '../../components/portal/src/_shared.props'

import { useEffect } from 'react'
import { shallowEqual } from '@mink-ui/shared/object/shallow-equal'

import { findContainerElement } from '../../utils/element'
import { useConstant } from '../use-constant'
import { useEvent } from '../use-event'
import { ObserverControl } from './utils/observer-control'

export function useResizeObserver<T extends Element>(
  container: GetContainerElement<T>,
  handler: (el: Element) => void,
) {
  const ctrl = useConstant(() => new ObserverControl<T>())

  const callback = useEvent(handler)

  useEffect(() => ctrl.subscribe(), [ctrl])

  useEffect(() => {
    const element = findContainerElement(container)

    if (shallowEqual(element, ctrl.element)) return

    ctrl.observe(element, callback)
  }, [ctrl, container, callback])

  useEffect(() => () => { ctrl.destroy() }, [ctrl])
}
