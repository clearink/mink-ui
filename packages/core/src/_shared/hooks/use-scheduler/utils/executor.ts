import type { AnyFn } from '@mink-ui/shared/interface'

import { execute } from '@mink-ui/shared/function/execute'

import { makeUniqueId } from '../../../utils/make-unique-id'

export class DeferredExecutor<T> {
  /**
   * @description 事件
   */
  private _callbacks = new Map<string, AnyFn>()

  /**
   * @description
   */
  private uniqueId = makeUniqueId('de-')

  /**
   * @description 当前标识
   */
  public current: T

  constructor(private initial: T) {
    this.current = initial
  }

  /**
   * @description 执行所有事件
   */
  private flush = () => {
    this._callbacks.forEach(execute)
    this._callbacks.clear()

    this.current = this.initial
  }

  /**
   * @description 清除副作用
   */
  public cleanup = (id: string, cleanup: (id: T) => void) => {
    this._callbacks.delete(id)

    // 存在回调函数 || 不处于调度中
    if (this._callbacks.size || this.current === this.initial) return

    cleanup(this.current)

    this.current = this.initial
  }

  /**
   * @description 调度逻辑
   */
  public execute = (fn: AnyFn, schedule: AnyFn) => {
    // 初始化时变更一次 current
    if (this.current === this.initial) {
      this.current = schedule(this.flush)
    }

    const id = this.uniqueId()

    this._callbacks.set(id, fn)

    return id
  }
}
