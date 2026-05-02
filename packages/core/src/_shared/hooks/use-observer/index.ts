import type { MayBe, VoidFn } from '@mink-ui/shared/interface'
import type { GetContainerElement } from '../../components/portal/src/_shared.props'

import { useEffect } from 'react'
import { noop } from '@mink-ui/shared/function/noop'
import { shallowEqual } from '@mink-ui/shared/object/shallow-equal'

import { findContainerElement } from '../../utils/element'
import { useConstant } from '../use-constant'
import { useEvent } from '../use-event'
import observer from './utils/observer'

class ObserverControl<T extends Element> {
  public cleanup: VoidFn | null = null

  public element = null as MayBe<T>

  /**
   * @description 清理
   */
  public dispose = () => {
    this.cleanup?.()

    this.cleanup = null
  }

  /**
   * @description 销毁
   */
  public destroy = () => {
    this.dispose()
    this.element = null
  }
}

export function useResizeObserver<T extends Element>(
  container: GetContainerElement<T>,
  handler: (el: Element) => void,
) {
  const ctrl = useConstant(() => new ObserverControl<T>())

  const callback = useEvent(handler)

  useEffect(() => () => { ctrl.destroy() }, [ctrl])

  useEffect(() => {
    const element = findContainerElement(container)

    if (shallowEqual(element, ctrl.element)) return

    ctrl.dispose()

    ctrl.element = element

    ctrl.cleanup = element ? observer.observe(element, callback) : noop
  }, [ctrl, container, callback])
}
