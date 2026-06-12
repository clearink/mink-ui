import type { MouseEvent } from 'react'
import type { AnyFn, MayBe } from '@mink-ui/shared/interface'
import type { SetStateDispatch } from '../../../_shared/types/state-dispatch'
import type { ModalHolderItem, ModalHookMethods, ModalMethodParams, ModalVariantMethods } from '../_shared.props'
import type { InternalModalProps } from '../modal.props'

import { batch } from '@mink-ui/shared/function/batch'
import { isThenable } from '@mink-ui/shared/is/is-promise'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'

import { makeUniqueId } from '../../../_shared/utils/make-unique-id'
import { getBuiltinStatus } from '../../../_shared/utils/status'
import { withResolvers } from '../../../_shared/utils/with-resolvers'

export class ModalHookControl {
  private _change!: SetStateDispatch<Map<string, ModalHolderItem>>
  private _prepare!: (params: ModalMethodParams) => InternalModalProps

  private _uniqueId = makeUniqueId('m-')

  /**
   * @description 绑定最新的数据
   */
  public _bind = (
    change: ModalHookControl['_change'],
    prepare: ModalHookControl['_prepare'],
  ) => {
    this._change = change
    this._prepare = prepare
  }

  /**
   * @description 添加弹窗
   */
  private append = (id: string, config: ModalMethodParams) => {
    this._change((prev) => {
      const next = new Map(prev)

      next.set(id, { config, isOpen: true })

      return next
    })
  }

  /**
   * @description 更新弹窗
   */
  private update = (id: string, config: Partial<ModalMethodParams>) => {
    this._change((prev) => {
      const cache = prev.get(id)

      if (!cache) return prev

      const next = new Map(prev)

      next.set(id, { ...cache, config: { ...cache.config, ...config } })

      return next
    })
  }

  /**
   * @description 关闭弹窗
   */
  private close = (id: string) => {
    this._change((prev) => {
      const cache = prev.get(id)

      if (!cache) return prev

      const next = new Map(prev)

      next.set(id, { ...cache, isOpen: false })

      return next
    })
  }

  /**
   * @description 完全关闭
   */
  private finish = (id: string) => {
    this._change((prev) => {
      if (!prev.has(id)) return prev

      const next = new Map(prev)

      next.delete(id)

      return next
    })
  }

  /**
   * @description 生成 promise 以及相关方法
   */
  private generate = (id: string) => {
    const { promise, resolve } = withResolvers<boolean>()

    return {
      promise,
      wrap: (handler: MayBe<AnyFn>, confirmed: boolean, immediate = false) => {
        const callback = () => { resolve(confirmed); this.close(id) }

        return (event: MouseEvent | KeyboardEvent) => {
          const result = handler?.(event as MouseEvent)

          if (immediate || !isThenable(result)) return callback()

          return result.then(callback)
        }
      },
    }
  }

  /**
   * @description 打开弹窗
   */
  public confirm: ModalHookMethods['confirm'] = (params) => {
    const id = this._uniqueId()

    const { promise, wrap } = this.generate(id)

    const config = this._prepare(params)

    config.onOk = wrap(params.onOk, true)

    config.onCancel = wrap(params.onCancel, false)

    config.onClosed = batch(params.onClosed, () => { this.finish(id) })

    config._onDismiss = wrap(params.onCancel, false, true)

    config._showCancel = !isUndefined(params.onCancel) || config.type === 'confirm'

    this.append(id, config)

    return {
      then: callback => promise.then(callback),
      update: (config) => { this.update(id, config) },
      close: () => { this.close(id) },
    }
  }

  /**
   * @description 向外暴露方法
   */
  public expose = (): ModalHookMethods => {
    const { confirm } = this

    return Object.assign(
      getBuiltinStatus().reduce((result, status) => {
        result[status] = params => confirm({ ...params, type: status })
        return result
      }, {} as ModalVariantMethods),
      { confirm },
    )
  }
}
