import type { ReactElement } from 'react'
import type { VoidFn } from '@mink-ui/shared/interface'
import type { SwitchTransitionEntry } from '../_shared.props'
import type { CssTransitionInstance, CssTransitionProps } from '../css-transition.props'
import type { SwitchTransitionProps } from '../switch-transition.props'

import { cloneElement, createElement } from 'react'
import { atIndex } from '@mink-ui/shared/array/at-index'
import { batch } from '@mink-ui/shared/function/batch'
import { omit } from '@mink-ui/shared/object/omit'

import CssTransition from '../css-transition'
import { normalizeCssTransitionChildren, runCounter } from './helpers'

export const excluded = ['key', 'mode', 'ref', 'children', 'when', 'unmountOnExit'] as const

export class SwitchTransitionControl {
  private _entries: SwitchTransitionEntry[] = []

  private _instances = new Map<ReactElement['key'], CssTransitionInstance>()

  public current: ReactElement

  constructor(private forceUpdate: VoidFn, public _props: SwitchTransitionProps) {
    this.current = _props.children

    this._entries = [this._createEntry(this.current, { when: true }, undefined)]
  }

  /**
   * @description 获取 css-transition 实例
   */
  private _getInstance = (index: number) => {
    const instance = this._instances.get(atIndex(this._entries, index).key)

    return {
      ...instance,
      isFinished: instance?.isEntered || instance?.isExited,
      isInLeaving: instance?.isExiting || instance?.isExited,
    }
  }

  /**
   * @description 创建 transition entry
   */
  private _createEntry = (element: ReactElement<any>, params: Partial<CssTransitionProps>, callback: VoidFn | undefined) => {
    const rawKey = element.key

    const preset = omit(this._props as any, excluded) as CssTransitionProps

    const attrs = Object.assign(preset, params, {
      key: rawKey,
      unmountOnExit: true,
      children: normalizeCssTransitionChildren(element),
      ref: (instance: CssTransitionInstance) => {
        if (!instance) this._instances.delete(rawKey)
        else this._instances.set(rawKey, instance)
      },
    }) as CssTransitionProps

    if (attrs.when && callback) attrs.onEntered = batch(attrs.onEntered, callback)
    else if (callback) attrs.onExited = batch(attrs.onExited, callback)

    return { key: rawKey, raw: element, node: createElement(CssTransition, attrs) }
  }

  /**
   * @description 更新 transition entry
   */
  private _updateEntry = (entry: SwitchTransitionEntry, callback: VoidFn) => {
    const preset = omit(this._props as any, excluded) as CssTransitionProps

    const instance = this._instances.get(entry.key)

    const params = { when: !(instance?.isEntered || instance?.isEntering) }

    const attrs = Object.assign({ onEntered: undefined, onExited: undefined }, preset, params) as CssTransitionProps

    if (attrs.when) attrs.onEntered = batch(attrs.onEntered, callback)
    else attrs.onExited = batch(attrs.onExited, callback)

    return { key: entry.key, raw: entry.raw, node: cloneElement(entry.node, attrs) }
  }

  /**
   * @description 更新当前元素
   */
  private _updateCurrent = (current: SwitchTransitionControl['current']) => {
    this.current = current
  }

  /**
   * @description 更新 transition entries
   */
  private _updateEntries = (values: SwitchTransitionControl['_entries']) => {
    const map = new Map<ReactElement['key'], SwitchTransitionEntry>()

    values.forEach((item) => { map.set(item.key, item) })

    this._entries = Array.from(map.values())

    this.forceUpdate()
  }

  /**
   * @description 更新内部属性
   */
  public updateInternals = (props: SwitchTransitionProps) => {
    this._props = props
  }

  /**
   * @description 切换动画 out-in
   */
  public runOutInSwitch = () => {
    const onExited = () => {
      this._updateCurrent(this._props.children)

      this._updateEntries([
        this._createEntry(this.current, { appear: true, when: true }, undefined),
      ])
    }

    this._updateEntries([
      this._updateEntry(atIndex(this._entries, 0), onExited),
    ])

    this._getInstance(0)?.isExited && onExited()
  }

  /**
   * @description 切换动画 in-out
   */
  public runInOutSwitch = () => {
    this._updateCurrent(this._props.children)

    const onEntered = () => {
      const onExited = () => { this._updateEntries([atIndex(this._entries, -1)]) }

      this._updateEntries([
        this._updateEntry(atIndex(this._entries, 0), onExited),
        atIndex(this._entries, -1),
      ])

      this._getInstance(0)?.isExited && onExited()
    }

    this._updateEntries([
      atIndex(this._entries, -1),
      this._createEntry(this.current, { appear: true, when: true }, onEntered),
    ])

    this._getInstance(-1)?.isEntered && onEntered()
  }

  /**
   * @description 切换动画 default
   */
  public runDefaultSwitch = () => {
    this._updateCurrent(this._props.children)

    const handler = runCounter(2, () => {
      this._updateEntries(this._entries.filter(item => item.key === this.current.key))
    })

    this._updateEntries([
      this._updateEntry(atIndex(this._entries, 0), handler),
      this._entries.length === 1
        ? this._createEntry(this.current, { appear: true, when: true }, handler)
        : this._updateEntry(atIndex(this._entries, -1), handler),
    ])

    this._getInstance(0)?.isFinished && handler()
    this._getInstance(-1)?.isFinished && handler()
  }

  /**
   * @description 渲染元素
   */
  public renderEntries = (child: SwitchTransitionProps['children']) => {
    return this._entries.map((item, index) => {
      const instance = this._getInstance(index)

      if (instance.isInLeaving) return item.node

      if (item.key !== child.key) return item.node

      if (child === item.raw) return item.node

      // 尽可能同步最新的数据
      return cloneElement(item.node, { children: normalizeCssTransitionChildren(child) })
    })
  }
}
