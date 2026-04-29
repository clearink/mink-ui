import type { ReactElement } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { GroupTransitionEntry } from '../_shared.props'
import type { CssTransitionInstance, CssTransitionProps } from '../css-transition.props'
import type { GroupTransitionProps } from '../group-transition.props'

import { Children, cloneElement, createElement } from 'react'
import { batch } from '@mink-ui/shared/function/batch'
import { omit } from '@mink-ui/shared/object/omit'

import CssTransition from '../css-transition'
import { diff, isGroupTransitionEntry, union } from './children'
import { normalizeCssTransitionChildren } from './helpers'

const excluded = ['key', 'onFinished', 'ref', 'children', 'when', 'unmountOnExit'] as const

export class GroupTransitionControl {
  private _entries: GroupTransitionEntry[] = []

  public instances = new Map<ReactElement['key'], CssTransitionInstance>()

  public current: ReactElement[] = []

  constructor(private forceUpdate: VoidFn, public _props: GroupTransitionProps) {
    this.current = _props.children

    this._entries = []

    Children.forEach(this.current, (child) => {
      this._entries.push(this._createEntry(child, { when: true }))
    })
  }

  /**
   * @description 获取 css-transition 实例
   */
  private _getInstance = (key: ReactElement['key']) => {
    const instance = this.instances.get(key)

    return {
      ...instance,
      isInLeaving: instance?.isExiting || instance?.isExited,
    }
  }

  /**
   * @description 创建 transition entry
   */
  private _createEntry = (element: ReactElement, params: Partial<CssTransitionProps>) => {
    const rawKey = element.key

    const preset = omit(this._props as any, excluded) as CssTransitionProps

    const attrs = Object.assign(preset, params, {
      key: rawKey,
      unmountOnExit: true,
      children: normalizeCssTransitionChildren(element),
      ref: (instance: CssTransitionInstance) => {
        if (!instance) this.instances.delete(rawKey)
        else this.instances.set(rawKey, instance)
      },
    })

    return { key: rawKey, raw: element, node: createElement(CssTransition, attrs) }
  }

  /**
   * @description 更新 transition entry
   */
  private _updateEntry = (entry: GroupTransitionEntry, params: Partial<CssTransitionProps>) => {
    const preset = omit(this._props as any, excluded) as CssTransitionProps

    const attrs = Object.assign(preset, params, {
      onEntered: batch(preset.onEntered, this.handleOnFinished),
      onExited: batch(preset.onExited, this.handleOnFinished),
    }) as CssTransitionProps

    return { key: entry.key, raw: entry.raw, node: cloneElement(entry.node, attrs) }
  }

  /**
   * @description 更新当前元素
   */
  private _updateCurrent = (current: GroupTransitionControl['current']) => {
    this.current = current
  }

  /**
   * @description 更新 transition entries
   */
  private _updateEntries = (values: GroupTransitionControl['_entries']) => {
    const map = new Map<ReactElement['key'], GroupTransitionEntry>()

    values.forEach((item) => { map.set(item.node.key, item) })

    this._entries = Array.from(map.values())

    this.forceUpdate()
  }

  /**
   * @description 更新内部属性
   */
  public updateInternals = (props: GroupTransitionProps) => {
    this._props = props
  }

  /**
   * @description 结束时的回调
   */
  public handleOnFinished = () => {
    let isExitFinished = true

    const newEntries = this._entries.filter((item) => {
      const instance = this.instances.get(item.key)

      if (!instance) return false

      if (instance.isExiting) isExitFinished = false

      return !instance.isExited
    })

    isExitFinished && this._updateEntries(newEntries)

    isExitFinished && this._props.onFinished?.()
  }

  /**
   * @description 运行过渡
   */
  public runGroupTransition = () => {
    const { children } = this._props

    const [enters, exits] = diff(this.current, children)

    const allEntries = union(this._entries, enters, children)

    const newEntries = allEntries.map((item) => {
      if (!isGroupTransitionEntry(item)) {
        return this._createEntry(item, { appear: true, when: true })
      }

      const params = {} as CssTransitionProps

      if (enters.has(item.key)) params.when = true
      else if (exits.has(item.key)) params.when = false

      return this._updateEntry(item, params)
    })

    this._updateCurrent(children)

    this._updateEntries(newEntries)
  }

  /**
   * @description 渲染元素
   */
  public renderEntries = (children: GroupTransitionProps['children']) => {
    const map = new Map<ReactElement['key'], ReactElement>()

    Children.forEach(children, (child): void => { map.set(child.key, child) })

    return this._entries.map((item) => {
      const child = map.get(item.key)
      const instance = this._getInstance(item.key)

      if (!child || instance.isInLeaving) return item.node

      if (item.key !== child.key) return item.node

      if (child === item.raw) return item.node

      // 尽可能同步最新的数据
      return cloneElement(item.node, { children: normalizeCssTransitionChildren(child) })
    })
  }
}
