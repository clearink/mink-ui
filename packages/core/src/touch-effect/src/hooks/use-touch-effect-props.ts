import type { TouchEffectInfo } from '../_shared.props'
import type { OmittedTouchEffectProps, TouchEffectProps } from '../touch-effect.props'

import { useEffect, useRef } from 'react'
import { makeEventListener } from '@mink-ui/shared/dom/listener'
import { isBoolean } from '@mink-ui/shared/is/is-boolean'
import { isFunction } from '@mink-ui/shared/is/is-function'

import { useMergeRefs } from '../../../_shared/hooks/use-merge-refs'
import { useThrottleFrame } from '../../../_shared/hooks/use-scheduler'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'
import showWaveEffect from '../utils/show-wave-effect'

export function useTouchEffectProps(props: TouchEffectProps) {
  const globalConfig = useConfiguration('touchEffect') || {}

  const {
    children,
    component,
    selector,
    disabled = globalConfig.disabled,
  } = props

  const ns = useNamespace('touch-effect', undefined)

  const $container = useRef<HTMLElement>(null)

  const refer = useMergeRefs($container, (children.props as any).ref || (children as any).ref)

  const showTouchEffect = useThrottleFrame((container: HTMLElement, event: MouseEvent) => {
    if (isBoolean(disabled) && disabled) return

    let target: HTMLElement | null = container

    if (isFunction(selector)) target = selector(container)
    else if (selector) target = container.querySelector(selector)

    const info: TouchEffectInfo = { component, container, event, className: ns, target }

    if (isFunction(disabled) && disabled(info)) return

    (globalConfig?.showEffect ?? showWaveEffect)(info)
  })

  useEffect(() => {
    const container = $container.current

    // NODE.ELEMENT_NODE === 1
    if (!container || disabled || container.nodeType !== 1) {
      return
    }

    const handler = (event: any) => { showTouchEffect(container, event) }

    return makeEventListener(container, 'click', handler, true)
  }, [disabled, showTouchEffect])

  return {
    omitted: props as OmittedTouchEffectProps,
    refer,
  }
}
