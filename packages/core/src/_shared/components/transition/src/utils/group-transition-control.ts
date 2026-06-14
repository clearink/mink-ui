import type { VoidFn } from '@mink-ui/shared/interface'
import type { ManagedTransitionEntry, UniqueTransitionItem } from '../_shared.props'
import type { CssTransitionInstance, CssTransitionProps } from '../css-transition.props'
import type { GroupTransitionProps } from '../group-transition.props'

import { cloneElement, createElement } from 'react'
import { batch } from '@mink-ui/shared/function/batch'
import { omit } from '@mink-ui/shared/object/omit'

import { jsxId } from '../../../../utils/jsx-id'
import { ENTRY_MARK } from '../_shared.constant'
import CssTransition from '../css-transition'
import { diff, union } from './children'
import { isManagedTransitionEntry, normalizeCssTransitionChildren } from './helpers'

const excluded = ['key', 'onGroupExited', 'ref', 'children', 'when', 'unmountOnExit'] as const

export class GroupTransitionControl<T extends UniqueTransitionItem = UniqueTransitionItem> {
  private _entries: ManagedTransitionEntry[] = []

  public instances = new Map<T['key'], CssTransitionInstance>()

  public current: T[] = []

  constructor(private forceUpdate: VoidFn, public _props: GroupTransitionProps<T>) {
    this.current = _props.items

    this._entries = this.current.map(item => this.createEntry(item, { when: true }))
  }

  /**
   * @description 绑定最新的数据
   */
  public _bind = (props: GroupTransitionProps<T>) => {
    this._props = props
  }

  /**
   * @description 获取 css-transition 实例
   */
  private getInstance = (key: T['key']) => {
    return this.instances.get(key)
  }

  /**
   * @description 创建 transition entry
   */
  private createEntry = (item: T, params: Partial<CssTransitionProps>) => {
    const preset = omit(this._props as any, excluded) as CssTransitionProps

    const attrs = Object.assign(preset, params, {
      _item: item,
      key: jsxId(item.key),
      unmountOnExit: true,
      children: normalizeCssTransitionChildren(this._props.children, item),
      ref: (instance: CssTransitionInstance) => {
        if (!instance) this.instances.delete(item.key)
        else this.instances.set(item.key, instance)
      },
    })

    return {
      [ENTRY_MARK]: true,
      key: item.key,
      node: createElement(CssTransition, attrs),
    }
  }

  /**
   * @description 更新 transition entry
   */
  private updateEntry = (entry: ManagedTransitionEntry, params: Partial<CssTransitionProps>) => {
    const preset = omit(this._props as any, excluded) as CssTransitionProps

    const attrs = Object.assign(preset, params, {
      onExited: batch(preset.onExited, this.handleGroupFinished),
    }) as CssTransitionProps

    return {
      [ENTRY_MARK]: true,
      key: entry.key,
      node: cloneElement(entry.node, attrs),
    }
  }

  /**
   * @description 更新 transition entry node
   */
  private updateNode = (entry: ManagedTransitionEntry, params: Partial<CssTransitionProps>) => {
    return this.updateEntry(entry, params).node
  }

  /**
   * @description 更新当前元素
   */
  private updateCurrent = (current: GroupTransitionControl<T>['current']) => {
    this.current = current
  }

  /**
   * @description 更新 transition entries
   */
  private updateEntries = (values: GroupTransitionControl['_entries']) => {
    const map = new Map<T['key'], ManagedTransitionEntry>()

    values.forEach((item) => { map.set(item.key, item) })

    this._entries = Array.from(map.values())

    this.forceUpdate()
  }

  /**
   * @description 结束时的回调
   */
  public handleGroupFinished = () => {
    let isGroupExited = true

    const newEntries = this._entries.filter((item) => {
      const instance = this.instances.get(item.key)

      if (!instance) return false

      if (instance.isExiting) isGroupExited = false

      return !instance.isExited
    })

    isGroupExited && this.updateEntries(newEntries)

    isGroupExited && this._props.onGroupExited?.()
  }

  /**
   * @description 运行过渡
   */
  public runGroupTransition = () => {
    const { items } = this._props

    const [enters, exits] = diff(this.current, items)

    const newEntries = union(this._entries, items).map((item) => {
      if (!isManagedTransitionEntry(item)) {
        return this.createEntry(item as T, { appear: true, when: true })
      }

      const params = {} as CssTransitionProps

      if (enters.has(item.key)) params.when = true
      else if (exits.has(item.key)) params.when = false

      return this.updateEntry(item, params)
    })

    this.updateCurrent(items)

    this.updateEntries(newEntries)
  }

  /**
   * @description 渲染元素
   */
  public renderEntries = () => {
    const { items, children } = this._props

    const map = new Map(items.map(item => [item.key, item]))

    return this._entries.map((entry) => {
      const instance = this.getInstance(entry.key)
      const config = map.get(entry.key)

      if (instance?.isExiting) return entry.node
      if (!config || !map.has(entry.key)) return entry.node

      const normalized = normalizeCssTransitionChildren(children, config)

      return entry.node = this.updateNode(entry, { children: normalized })
    })
  }
}
