import type { VoidFn } from '@mink-ui/shared/interface'
import type { ManagedTransitionEntry, UniqueTransitionItem } from '../_shared.props'
import type { CssTransitionInstance, CssTransitionProps } from '../css-transition.props'
import type { SwitchTransitionProps } from '../switch-transition.props'

import { cloneElement, createElement } from 'react'
import { atIndex } from '@mink-ui/shared/array/at-index'
import { batch } from '@mink-ui/shared/function/batch'
import { omit } from '@mink-ui/shared/object/omit'

import { ENTRY_MARK } from '../_shared.constant'
import CssTransition from '../css-transition'
import { normalizeCssTransitionChildren, runCounter } from './helpers'

export const excluded = ['key', 'mode', 'ref', 'children', 'when', 'unmountOnExit'] as const

export class SwitchTransitionControl<T extends UniqueTransitionItem = UniqueTransitionItem> {
  private _entries: ManagedTransitionEntry[] = []

  private _instances = new Map<T['key'], CssTransitionInstance>()

  public current: T

  constructor(private forceUpdate: VoidFn, public _props: SwitchTransitionProps<T>) {
    this.current = _props.current

    this._entries = [this.createEntry(this.current, { when: true }, undefined)]
  }

  /**
   * @description 绑定最新的数据
   */
  public _bind = (props: SwitchTransitionProps<T>) => {
    this._props = props
  }

  /**
   * @description 获取 css-transition 实例
   */
  private getInstance = (index: number) => {
    const instance = this._instances.get(atIndex(this._entries, index).key)

    if (!instance) return undefined

    return {
      ...instance,
      isFinished: instance.isEntered || instance.isExited,
    }
  }

  /**
   * @description 创建 transition entry
   */
  private createEntry = (item: T, params: Partial<CssTransitionProps>, callback: VoidFn | undefined) => {
    const preset = omit(this._props as any, excluded) as CssTransitionProps

    const attrs = Object.assign(preset, params, {
      _item: item,
      key: `${item.key}`,
      unmountOnExit: true,
      onEntered: batch(preset.onEntered, callback),
      children: normalizeCssTransitionChildren(this._props.children, item),
      ref: (instance: CssTransitionInstance) => {
        if (!instance) this._instances.delete(item.key)
        else this._instances.set(item.key, instance)
      },
    }) as CssTransitionProps

    return {
      [ENTRY_MARK]: true,
      key: item.key,
      node: createElement(CssTransition, attrs),
      callback,
    }
  }

  /**
   * @description 更新 transition entry
   */
  private updateEntry = (entry: ManagedTransitionEntry, callback: VoidFn) => {
    const preset = omit(this._props as any, excluded) as CssTransitionProps

    const instance = this._instances.get(entry.key)

    const params = { when: !(instance?.isEntered || instance?.isEntering) }

    const attrs = Object.assign({ onEntered: undefined, onExited: undefined }, preset, params) as CssTransitionProps

    if (attrs.when) attrs.onEntered = batch(attrs.onEntered, callback)
    else attrs.onExited = batch(attrs.onExited, callback)

    return {
      [ENTRY_MARK]: true,
      key: entry.key,
      node: cloneElement(entry.node, attrs),
      callback,
    }
  }

  /**
   * @description 同步 transition node 的最新数据
   */
  private updateNode = (entry: ManagedTransitionEntry, params: Partial<CssTransitionProps>) => {
    const preset = omit(this._props as any, excluded) as CssTransitionProps

    const attrs = Object.assign(preset, params) as CssTransitionProps

    // TODO: 这里的判断需要后续观察
    if (entry.node.props.when) attrs.onEntered = batch(attrs.onEntered, entry.callback)
    else attrs.onExited = batch(attrs.onExited, entry.callback)

    return cloneElement(entry.node, attrs)
  }

  /**
   * @description 更新当前元素
   */
  private updateCurrent = (current: SwitchTransitionControl<T>['current']) => {
    this.current = current
  }

  /**
   * @description 更新 transition entries
   */
  private updateEntries = (values: SwitchTransitionControl<T>['_entries']) => {
    const map = new Map<T['key'], ManagedTransitionEntry>()

    values.forEach((item) => { map.set(item.key, item) })

    this._entries = Array.from(map.values())

    this.forceUpdate()
  }

  /**
   * @description 切换动画 out-in
   */
  public runOutInSwitch = () => {
    const onExited = () => {
      this.updateCurrent(this._props.current)

      this.updateEntries([
        this.createEntry(this.current, { appear: true, when: true }, undefined),
      ])
    }

    this.updateEntries([
      this.updateEntry(atIndex(this._entries, 0), onExited),
    ])

    this.getInstance(0)?.isExited && onExited()
  }

  /**
   * @description 切换动画 in-out
   */
  public runInOutSwitch = () => {
    this.updateCurrent(this._props.current)

    const onEntered = () => {
      const onExited = () => { this.updateEntries([atIndex(this._entries, -1)]) }

      this.updateEntries([
        this.updateEntry(atIndex(this._entries, 0), onExited),
        atIndex(this._entries, -1),
      ])

      this.getInstance(0)?.isExited && onExited()
    }

    this.updateEntries([
      atIndex(this._entries, -1),
      this.createEntry(this.current, { appear: true, when: true }, onEntered),
    ])

    this.getInstance(-1)?.isEntered && onEntered()
  }

  /**
   * @description 切换动画 default
   */
  public runDefaultSwitch = () => {
    this.updateCurrent(this._props.current)

    const handler = runCounter(2, () => {
      this.updateEntries(this._entries.filter(item => item.key === this.current.key))
    })

    this.updateEntries([
      this.updateEntry(atIndex(this._entries, 0), handler),
      this._entries.length === 1
        ? this.createEntry(this.current, { appear: true, when: true }, handler)
        : this.updateEntry(atIndex(this._entries, -1), handler),
    ])

    this.getInstance(0)?.isFinished && handler()
    this.getInstance(-1)?.isFinished && handler()
  }

  /**
   * @description 渲染元素
   */
  public renderEntries = () => {
    const { current: item, children } = this._props

    const map = new Map([[item.key, item]])

    return this._entries.map((entry, index) => {
      const instance = this.getInstance(index)

      const config = map.get(entry.key)

      if (instance?.isExiting) return entry.node
      if (!config || !map.has(entry.key)) return entry.node

      const normalized = normalizeCssTransitionChildren(children, config)

      return entry.node = this.updateNode(entry, { children: normalized })
    })
  }
}
