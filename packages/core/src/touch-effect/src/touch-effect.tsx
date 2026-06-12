import type { TouchEffectProps } from './touch-effect.props'

import { cloneElement } from 'react'

import { defineName } from '../../_shared/utils/define-name'
import { useTouchEffectProps } from './hooks/use-touch-effect-props'

function TouchEffect(props: TouchEffectProps) {
  const { omitted, restAttrs } = useTouchEffectProps(props)

  const { children } = omitted

  return cloneElement(children, restAttrs)
}

defineName(TouchEffect)

export default TouchEffect
