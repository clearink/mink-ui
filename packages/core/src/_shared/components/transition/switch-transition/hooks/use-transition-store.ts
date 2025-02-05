import type { ReactElement } from 'react'

import { useConstant, useForceUpdate } from '@mink-ui/core/_shared/hooks'
import { makeUniqueId } from '@mink-ui/core/_shared/utils'
import { atIndex, batch, omit } from '@mink-ui/shared'
import { cloneElement, createElement, useMemo } from 'react'

import type { CssTransitionProps as CssProps, CssTransitionRef as CssRef } from '../../css-transition/props'
import type { SwitchElementItem, SwitchTransitionProps as SwitchProps } from '../props'

import CssTransition from '../../css-transition'
import runCounter from '../../utils/run-counter'
import { isEnterDisabled, isExitDisabled } from '../utils/disabled'

const excluded = ['children', 'mode', 'when'] as const

export class TransitionState<E extends HTMLElement> {
  current: ReactElement

  elements: SwitchElementItem[] = []

  components = new Map<ReactElement['key'], CssRef>()

  constructor(public _props: SwitchProps<E>) {
    this.current = _props.children
  }
}

export class TransitionAction<E extends HTMLElement> {
  private get _props() {
    return this.states._props
  }

  private get elements() {
    return this.states.elements
  }

  private get components() {
    return this.states.components
  }

  private uniqueId = makeUniqueId('st-')

  private makeElement = (element: ReactElement<CssProps<E>>, props?: Partial<CssProps<E>>) => {
    const rawKey = element.key

    const preset = omit(this._props as any, excluded) as CssProps

    Object.assign(preset, props, {
      ref: (instance: CssRef | null) => {
        if (!instance) this.components.delete(rawKey)
        else this.components.set(rawKey, instance)
      },
      key: this.uniqueId(),
      when: true,
    })

    const node = createElement(CssTransition, preset, element)

    return { freeze: false, node, key: rawKey }
  }

  private cloneElement = ({ node, key }: SwitchElementItem, props: null | Partial<CssProps<E>>) => {
    // 拿到最新的回调函数
    const preset = omit(this._props as any, excluded) as CssProps

    Object.assign(preset, props)

    return { freeze: true, node: cloneElement(node, preset), key }
  }

  constructor(public forceUpdate: () => void, private states: TransitionState<E>) {
    states.elements = [this.makeElement(states.current)]
  }

  setInnerProps = (value: SwitchProps<E>) => {
    this.states._props = value
  }

  setCurrent = (value: TransitionState<E>['current']) => {
    this.states.current = value
  }

  setElements = (value: TransitionState<E>['elements']) => {
    const map = new Map<ReactElement['key'], SwitchElementItem>()

    value.forEach((item) => { map.set(item.node.key, item) })

    this.states.elements = Array.from(map.values())

    this.forceUpdate()
  }

  runDefaultSwitch = () => {
    this.setCurrent(this._props.children)

    const resolve = runCounter(2, () => {
      this.setElements([atIndex(this.elements, -1)])
    })

    const canNotEnter = isEnterDisabled(this.states)

    const canNotExit = isExitDisabled(this.states)

    if (canNotEnter) resolve()

    if (canNotExit) resolve()

    if (!(canNotEnter && canNotExit)) {
      this.setElements([
        this.cloneElement(atIndex(this.elements, -1), {
          appear: true,
          when: false,
          onExited: batch(this._props.onExited, resolve),
        }),
        this.makeElement(this.states.current, {
          appear: true,
          onEntered: batch(this._props.onEntered, resolve),
        }),
      ])
    }
  }

  runInOutSwitch = () => {
    this.setCurrent(this._props.children)

    const handleEntered = () => {
      const handleExited = () => {
        this.setElements([atIndex(this.elements, -1)])
      }

      if (isExitDisabled(this.states)) { handleExited() }
      else {
        this.setElements([
          this.cloneElement(atIndex(this.elements, 0), {
            when: false,
            onExited: batch(this._props.onExited, handleExited),
          }),
          atIndex(this.elements, -1),
        ])
      }
    }

    const shouldImmediate = isEnterDisabled(this.states)

    this.setElements([
      this.cloneElement(atIndex(this.elements, -1), null),
      this.makeElement(this.states.current, {
        appear: true,
        onEntered: batch(this._props.onEntered, handleEntered),
      }),
    ])

    shouldImmediate && handleEntered()
  }

  runOutInSwitch = () => {
    const handleExited = () => {
      this.setCurrent(this._props.children)

      this.setElements([
        this.makeElement(this.states.current, { appear: true }),
      ])
    }

    if (isExitDisabled(this.states)) {
      handleExited()
    }
    else {
      this.setElements([
        this.cloneElement(atIndex(this.elements, 0), {
          appear: true,
          when: false,
          onExited: batch(this._props.onExited, handleExited),
        }),
      ])
    }
  }

  renderNodes = (child: SwitchProps<E>['children']) => {
    return this.elements.map((item) => {
      if (item.freeze || item.key !== child.key) return item.node

      if (child !== item.node.props.children) {
        // 尽可能同步最新的数据
        item.node = cloneElement(item.node, undefined, child)
      }

      return item.node
    })
  }
}

export default function useTransitionStore<E extends HTMLElement>(props: SwitchProps<E>) {
  const update = useForceUpdate()

  const states = useConstant(() => new TransitionState(props))

  const actions = useMemo(() => new TransitionAction(update, states), [update, states])

  useMemo(() => { actions.setInnerProps(props) }, [actions, props])

  return { actions, states }
}
