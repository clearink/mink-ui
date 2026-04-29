import type { InternalFieldName, InternalFormInstance } from '../_shared.props'
import type { InternalFormListProps, InternalListHelpers } from '../form-list.props'

import { swapIndex } from '@mink-ui/shared/array/swap-index'
import { toArray } from '@mink-ui/shared/array/to-array'

import { HOOKS_SECRET } from '../_shared.constant'
import { isValidIndex } from './path'

/**
 * @description 表单列表控制类
 */
export class FormListControl {
  /**
   * @description 表单实例
   */
  private _formInstance: InternalFormInstance | null = null

  /**
   * @description 最近的自增id
   */
  private _id = 0

  /**
   * @description 存储列表 key
   */
  private _keys: number[] = []

  /**
   * @description 字段 props
   */
  public _props = {} as InternalFormListProps

  /**
   * @description 列表字段名称
   */
  public _name: InternalFieldName = []

  /**
   * @description 注入 ListControl, helpers
   */
  static inject = () => {
    const instance = new FormListControl()

    return [instance, instance.getHelpers()] as const
  }

  /**
   * @description 获取当前字段数据
   */
  private getFieldValue = () => {
    return toArray(this._formInstance?.getFieldValue(this._name), true)
  }

  /**
   * @description 触发 dispatch 事件
   */
  private dispatchEvent = (value: unknown[]) => {
    const { _formInstance, _name, _props: { rule } } = this

    const _internalHooks = _formInstance?.getInternalHooks(HOOKS_SECRET)

    const control = _internalHooks?.getFormListControl(this, _name)

    control && _internalHooks?.dispatch({ type: 'fieldEvent', control, value })

    rule && _formInstance?.validateField(_name)
  }

  /**
   * @description 根据 index 获取 key
   */
  public getKeyFromIndex = (index: number) => {
    this._keys[index] ??= this._id++

    return this._keys[index]
  }

  /**
   * @description 追加一个数据
   */
  private append = (value?: unknown) => {
    this._keys = this._keys.concat(this._id)

    this.dispatchEvent(this.getFieldValue().concat(value))

    this._id++
  }

  /**
   * @description 插入一个数据
   */
  private insert = (index: number, value: unknown) => {
    const list = this.getFieldValue().slice()

    list.splice(index, 0, value)

    this._keys.splice(index, 0, this._id)

    this.dispatchEvent(list)

    this._id++
  }

  private move = (from: number, to: number) => {
    let list = this.getFieldValue()

    if (!isValidIndex(list, from, to)) return

    if (list[from] === list[to]) return

    list = list.slice()

    list.splice(to, 0, list.splice(from, 1)[0])

    this._keys.splice(to, 0, this._keys.splice(from, 1)[0])

    this.dispatchEvent(list)
  }

  /**
   * @description 头部添加一个数据
   */
  private prepend = (value?: unknown) => {
    this._keys = [this._id].concat(this._keys)

    const list = this.getFieldValue().slice()

    list.unshift(value)

    this.dispatchEvent(list)

    this._id++
  }

  /**
   * @description 删除一个数据
   */
  private remove = (index?: number | number[]) => {
    const positions = new Set(toArray(index))

    if (positions.size === 0) return

    const predicate = (_: unknown, i: number) => !positions.has(i)

    const list = this.getFieldValue()

    if (list.every(predicate)) return

    this._keys = this._keys.filter(predicate)

    this.dispatchEvent(list.filter(predicate))
  }

  /**
   * @description 替换一个数据
   */
  private replace = (index: number, value: unknown) => {
    let list = this.getFieldValue()

    if (!isValidIndex(list, index)) return

    if (list[index] === value) return

    list = list.slice()

    list[index] = value

    this.dispatchEvent(list)
  }

  /**
   * @description 交互一个数据
   */
  private swap = (from: number, to: number) => {
    let list = this.getFieldValue()

    if (!isValidIndex(list, from, to)) return

    if (list[from] === list[to]) return

    list = list.slice()

    swapIndex(list, from, to)

    swapIndex(this._keys, from, to)

    this.dispatchEvent(list)
  }

  public getHelpers = (): InternalListHelpers => {
    return {
      append: this.append,
      insert: this.insert,
      move: this.move,
      prepend: this.prepend,
      remove: this.remove,
      replace: this.replace,
      swap: this.swap,
    }
  }

  public updateInternals = (
    props: InternalFormListProps,
    formInstance: InternalFormInstance,
    listName: InternalFieldName,
  ) => {
    this._props = props
    this._formInstance = formInstance
    this._name = listName
  }
}
