import type { ReactElement } from 'react'

import { useConstant, useForceUpdate } from '@mink-ui/core/_shared/hooks'
import { makeUniqueId } from '@mink-ui/core/_shared/utils'
import { batch, omit } from '@mink-ui/shared'
import { Children, cloneElement, createElement, useMemo } from 'react'

import type { CssTransitionProps as CssProps, CssTransitionRef as CssRef } from '../../css-transition/props'
import type { GroupElementItem, GroupTransitionProps as GroupProps } from '../props'

import CssTransition from '../../css-transition'
import diff from '../utils/diff'
import union, { isGroupElementItem } from '../utils/union'

const excluded = ['children', 'onFinished', 'when', 'unmountOnExit'] as const

export class TransitionState<E extends HTMLElement> {
  components = new Map<ReactElement['key'], CssRef>()

  current: ReactElement[] = []

  elements: GroupElementItem[] = []

  constructor(public _props: GroupProps<E>) {
    this.current = _props.children
  }
}

class TransitionAction<E extends HTMLElement> {
  private get _props() {
    return this.states._props
  }

  private get elements() {
    return this.states.elements
  }

  private get components() {
    return this.states.components
  }

  private uniqueId = makeUniqueId('gt-')

  private makeElement = (element: ReactElement, props?: Partial<CssProps<E>>) => {
    const rawKey = element.key

    const preset = omit(this._props as any, excluded) as CssProps

    Object.assign(preset, props, {
      ref: (instance: CssRef | null) => {
        if (!instance) this.components.delete(rawKey)
        else this.components.set(rawKey, instance)
      },
      key: this.uniqueId(),
      when: true,
      unmountOnExit: true,
    })

    const node = createElement(CssTransition, preset, element)

    return { freeze: false, node, key: rawKey }
  }

  private cloneElement = ({ node, key }: GroupElementItem, freeze: boolean) => {
    // 拿到最新的回调函数
    const preset = omit(this._props as any, excluded) as CssProps

    Object.assign(preset, { onExited: batch(preset.onExited, this.handleFinished) })

    if (freeze) preset.when = false

    return { freeze, node: cloneElement(node, preset), key }
  }

  constructor(private forceUpdate: () => void, private states: TransitionState<E>) {
    states.elements = []

    Children.forEach(states.current, (child) => {
      states.elements.push(this.makeElement(child))
    })
  }

  setInnerProps = (value: GroupProps<E>) => {
    this.states._props = value
  }

  setCurrent = (value: TransitionState<E>['current']) => {
    this.states.current = value
  }

  setElements = (value: TransitionState<E>['elements']) => {
    const map = new Map<ReactElement['key'], GroupElementItem>()

    value.forEach((item) => { map.set(item.node.key, item) })

    this.states.elements = Array.from(map.values())
  }

  handleFinished = () => {
    let isFinished = true

    this.setElements(this.elements.filter((item) => {
      const instance = this.components.get(item.key)

      if (!instance) return false

      if (instance.isExiting) isFinished = false

      return !instance.isExited
    }))

    isFinished && this._props.onFinished?.()

    isFinished && this.forceUpdate()
  }

  updateElements = () => {
    const { children } = this._props

    const [enters, exits] = diff(this.states.current, children)

    const allElements = union(this.elements, enters, children)

    const newElements = allElements.reduce((result, el) => {
      result.push(isGroupElementItem(el)
        ? this.cloneElement(el, exits.has(el.key))
        : this.makeElement(el, { appear: true }))

      return result
    }, [] as TransitionState<E>['elements'])

    this.setElements(newElements)

    this.setCurrent(children)

    this.forceUpdate()
  }

  renderNodes = (children: GroupProps<E>['children']) => {
    const map = new Map<ReactElement['key'], ReactElement>()

    Children.forEach(children, (child) => { map.set(child.key, child) })

    return this.elements.map((item) => {
      const child = map.get(item.key)

      if (item.freeze || !child) return item.node

      if (child !== item.node.props.children) {
        // 尽可能同步最新的数据
        item.node = cloneElement(item.node, undefined, child)
      }

      return item.node
    })
  }
}

export default function useTransitionStore<E extends HTMLElement>(props: GroupProps<E>) {
  const update = useForceUpdate()

  const states = useConstant(() => new TransitionState(props))

  const actions = useMemo(() => new TransitionAction(update, states), [update, states])

  useMemo(() => { actions.setInnerProps(props) }, [actions, props])

  return { actions, states }
}
