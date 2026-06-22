import type { AnyObj } from '@mink-ui/shared/interface'
import type { TouchEffectInfo } from '../_shared.props'
import type { OmittedTouchEffectProps, TouchEffectProps } from '../touch-effect.props'

import { useEffect, useRef } from 'react'
import { makeEventListener } from '@mink-ui/shared/dom/listener'
import { isBoolean } from '@mink-ui/shared/is/is-boolean'
import { isFunction } from '@mink-ui/shared/is/is-function'

import { getElementRef, useComposeRefs } from '../../../_shared/hooks/use-compose-refs'
import { useThrottleFrame } from '../../../_shared/hooks/use-scheduler'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'
import { isNodeElement } from '../../../_shared/utils/element'
import showWaveEffect from '../utils/show-wave-effect'

export function useTouchEffectProps(props: TouchEffectProps) {
  const globalConfig = useConfiguration('touchEffect') || {}

  const {
    children,
    component,
    selector,
    disabled = globalConfig.disabled,
  } = props

  const omitted = props as OmittedTouchEffectProps

  const ns = useNamespace('touch-effect', undefined)

  const $container = useRef<HTMLElement>(null)

  const refComposed = useComposeRefs($container, getElementRef(children))

  const restAttrs: AnyObj = { ref: refComposed }

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

    if (disabled || !isNodeElement(container)) return

    const handler = (event: any) => { showTouchEffect(container, event) }

    return makeEventListener(container, 'click', handler, true)
  }, [disabled, showTouchEffect])

  return {
    omitted,
    restAttrs,
  }
}
