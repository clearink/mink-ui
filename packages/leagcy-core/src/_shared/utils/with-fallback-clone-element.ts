import type { AnyObj, MayBe } from '@mink-ui/shared'
import type { ReactNode } from 'react'

import { cloneElement, isValidElement } from 'react'

import { isFunction } from '@mink-ui/shared'

export interface WithFallbackCloneOptions {
  fallback: ReactNode
  props?: ((props: AnyObj) => MayBe<AnyObj>) | AnyObj
}

export async function withFallbackCloneElement(
  node: ReactNode,
  options: WithFallbackCloneOptions,
) {
  const { fallback, props } = options

  if (!isValidElement(node)) return fallback

  return cloneElement(node, isFunction(props) ? props(node.props || {}) : props)
}
