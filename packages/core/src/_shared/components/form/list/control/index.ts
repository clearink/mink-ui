import { isUndefined, toArray } from '@mink-ui/shared'

import type { InternalNamePath } from '../../_shared.props'
import type { InternalFormFieldProps } from '../../field/props'
import type { InternalFormInstance } from '../../form/control/props'
import type { InternalFormListProps } from '../props'
import type { FormListHelpers } from './props'

import { HOOK_MARK } from '../../form/control'
import { isValidIndex } from '../../utils/path'

// FormArray 管理 key
export default class FormListControl {
  _props = {} as InternalFormListProps

  private _instance: InternalFormInstance | null = null

  private _id = 0

  // 记录每一个 field 的唯一标识, 调用 remove 后会被移除
  private _keys: number[] = []

  private _listPath: InternalNamePath = []

  private _rule: InternalFormFieldProps['rule'] = undefined // 类似数据库自增id 添加字段时会被调用

  /** ===================================================== */
  private append = (value?: any) => {
    this._keys = this._keys.concat(this._id)
    this.dispatchEvent(this.getFieldList().concat(value))
    this._id += 1
  }

  private dispatchEvent = (value: any[]) => {
    const internalHooks = this._instance?.getInternalHooks(HOOK_MARK)

    internalHooks?.dispatch({
      type: 'setFields',
      fields: [{ name: this._listPath, value }],
    })

    this._rule && this._instance?.validateFields([this._listPath])
  }

  private getFieldList = (): any[] => {
    const array = this._instance?.getFieldValue(this._listPath)
    return toArray(array, true)
  }

  private insert = (index: number, value: any) => {
    const list = this.getFieldList().concat()

    list.splice(index, 0, value)

    this._keys.splice(index, 0, this._id)

    this.dispatchEvent(list)

    this._id += 1
  }

  private move = (from: number, to: number) => {
    let list = this.getFieldList()

    if (!isValidIndex(list, from, to)) return

    list = list.concat()

    list.splice(to, 0, list.splice(from, 1)[0])

    this._keys.splice(to, 0, this._keys.splice(from, 1)[0])

    this.dispatchEvent(list)
  }

  /** ===================================================== */
  /** features                                              */
  private prepend = (value?: any) => {
    this._keys = [this._id, ...this._keys]

    this.dispatchEvent([value].concat(this.getFieldList()))

    this._id += 1
  }

  private remove = (index?: number | number[]) => {
    const positions = new Set(toArray(index))

    const filter = (_, i) => positions.size > 0 && !positions.has(i)

    const list = this.getFieldList()

    this._keys = this._keys.filter(filter)

    this.dispatchEvent(list.filter(filter))
  }

  private replace = (index: number, value: any) => {
    const list = this.getFieldList()

    list[index] = value

    this.dispatchEvent(list)
  }

  private swap = (from: number, to: number) => {
    const list = this.getFieldList()

    ;[list[from], list[to]] = [list[to], list[from]]

    const keys = this._keys

    ;[this._keys[from], this._keys[to]] = [keys[to], keys[from]]

    this.dispatchEvent(list)
  }

  ensureFieldKey = (index: number) => {
    const origin = this._keys[index]

    if (isUndefined(origin)) {
      this._keys[index] = this._id
      this._id += 1 // 补齐
    }

    return this._keys[index]
  }

  getFeatures = (): FormListHelpers => {
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

  setInternalListProps = (
    props: InternalFormListProps,
    instance: InternalFormInstance,
    listPath: InternalNamePath,
  ) => {
    this._props = props

    this._instance = instance
    this._listPath = listPath
  }
}
