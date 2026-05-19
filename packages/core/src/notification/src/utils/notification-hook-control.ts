import type { SetStateDispatch } from '../../../_shared/types/state-dispatch'
import type { NotificationHolderGroup, NotificationHookMethods, NotificationMethodParams, NotificationPlacement, NotificationVariantMethods } from '../_shared.props'

import { isUndefined } from '@mink-ui/shared/is/is-undefined'

import { getBuiltinStatus } from '../../../_shared/utils/status'

export class NotificationHookControl {
  private _change!: SetStateDispatch<NotificationHolderGroup[]>
  private _prepare!: (params: NotificationMethodParams) => NotificationMethodParams

  /**
   * @description 绑定最新的数据
   */
  public _bind = (
    change: NotificationHookControl['_change'],
    prepare: NotificationHookControl['_prepare'],
  ) => {
    this._change = change
    this._prepare = prepare
  }

  /**
   * @description 打开通知
   */
  public open: NotificationHookMethods['open'] = (params) => {
    const item = this._prepare(params)

    this._change((prev) => {
      let found = false

      const next = prev.map((group) => {
        if (group.key !== item.placement) return group

        found = true

        return { ...group, items: new Map(group.items).set(item.key!, item) }
      })

      return found ? next : next.concat({ key: item.placement!, items: new Map().set(item.key!, item) })
    })
  }

  /**
   * @description 关闭通知
   */
  public close: NotificationHookMethods['close'] = (key) => {
    const isClearItems = isUndefined(key)

    this._change(prev => prev.map((group) => {
      if (isClearItems) return { ...group, items: new Map() }

      const next = new Map(group.items)

      next.delete(key)

      return { ...group, items: next }
    }))
  }

  /**
   * @description 完全关闭
   */
  public finish = (placement: NotificationPlacement) => {
    this._change(prev => prev.filter((group) => {
      if (group.key !== placement) return true

      return group.items.size > 0
    }))
  }

  /**
   * @description 向外暴露方法
   */
  public expose = (): NotificationHookMethods => {
    const { open, close } = this

    return Object.assign(
      getBuiltinStatus().reduce((result, status) => {
        result[status] = (params) => { open({ ...params, type: status }) }
        return result
      }, {} as NotificationVariantMethods),
      { open, close },
    )
  }
}
