import type { VoidFn } from '@mink-ui/shared/interface'
import type {
  ExternalFieldInfo,
  ExternalFieldName,
  InternalErrorInfo,
  InternalFieldName,
  InternalMetaInfo,
  MetaChangeEvent,
} from '../_shared.props'
import type { OmittedInternalFormFieldProps } from '../form-field.props'
import type { FormStateControl } from './form-control'

import isEqual from 'react-fast-compare'
import { arrayEqual } from '@mink-ui/shared/array/array-equal'
import { toArray } from '@mink-ui/shared/array/to-array'
import { isFunction } from '@mink-ui/shared/is/is-function'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'
import { hasOwn } from '@mink-ui/shared/object/has-own'
import { pick } from '@mink-ui/shared/object/pick'

import { FIELD_MARK, VALIDATE_FINISH, VALIDATE_INITIAL } from '../_shared.constant'
import { FieldValidateError } from './error'
import { _getId, getIn, hasIn } from './path'

function resetFieldsMetaInfo() {
  return { dirty: false, touched: false, warnings: [], errors: [], validating: false }
}

function beforeValidateMetaInfo() {
  return { dirty: true, warnings: [], errors: [], validating: true }
}

function afterValidateMetaInfo(warnings: string[], errors: string[]) {
  return { warnings, errors, validating: false }
}

function fieldEventMetaInfo() {
  return { dirty: true, touched: true }
}

function setFieldsValueMetaInfo() {
  return { dirty: true, touched: true, warnings: [], errors: [], validating: false }
}

function setFieldsInfoMetaInfo(fieldInfo: ExternalFieldInfo) {
  return {
    dirty: true,
    touched: fieldInfo.touched,
    warnings: fieldInfo.warnings,
    errors: fieldInfo.errors,
    validating: fieldInfo.validating,
  }
}

/**
 * @description 表单字段控制类
 */
export class FormFieldControl {
  /**
   * @description 额外的信息(字段加载时的初始值)
   */
  public __holder: undefined | { viewState: unknown }

  /**
   * @description 字段卸载时是否保留数据
   */
  public __keepValue = false

  /**
   * @description 刷新字段函数
   */
  private _refreshField: VoidFn

  /**
   * @description 获取字段最终的默认值
   */
  private _getInitialValue: (() => unknown) | undefined

  /**
   * @description 是否挂载
   */
  private _mounted = false

  /**
   * @description 最近的校验 promise
   */
  private _lastValidate: Promise<FieldValidateError | null> | symbol = VALIDATE_INITIAL

  /**
   * @description 字段上一次的 meta 信息
   */
  private _metaInfo: MetaChangeEvent | null = null

  /**
   * @description 字段 props
   */
  public _props = {} as OmittedInternalFormFieldProps

  /**
   * @description 字段路径
   */
  public _name: InternalFieldName = []

  /**
   * @description 字段唯一id（根据 name 生成）
   */
  public _id = ''

  /**
   * @description 字段是否被修改
   */
  private _dirty = false

  /**
   * @description 字段是否被 touched
   */
  private _touched = false

  /**
   * @description 字段是否正在校验
   */
  private _validating = false

  /**
   * @description 字段告警信息
   */
  private _warnings: string[] = []

  /**
   * @description 字段错误信息
   */
  private _errors: string[] = []

  /**
   * @description 字段更新函数
   */
  public forceUpdate: VoidFn

  constructor(_forceUpdate: VoidFn, _refreshField: VoidFn) {
    this.forceUpdate = () => {
      this._mounted && _forceUpdate()
    }

    this._refreshField = () => {
      this._mounted && _refreshField()
    }
  }

  /**
   * @description 字段是否被修改过 || 有默认值
   */
  public isDirty = () => {
    return this._dirty || !isUndefined(this._getInitialValue?.())
  }

  /**
   * @description 字段是否被触摸
   */
  public isTouched = () => {
    return this._touched
  }

  public isValidating = () => {
    return this._validating
  }

  /**
   * @description 是否有默认值
   */
  public hasInitialValue = () => {
    return !isUndefined(this._props.initialValue)
  }

  /**
   * @description 设置获取 Form 上的默认值
   */
  public setGetInitialValue = (getInitialValue: () => any) => {
    this._getInitialValue = getInitialValue
  }

  public updateKeepValueBehavior = (keepValue: boolean) => {
    this.__keepValue = keepValue
  }

  /**
   * @description 获取字段元信息
   */
  public getMetaInfo = (): InternalMetaInfo => {
    return {
      name: this._name,
      touched: this._touched,
      validating: this._validating,
      validated: this._lastValidate === VALIDATE_FINISH,
      warnings: this._warnings,
      errors: this._errors,
    }
  }

  /**
   * @description 字段信息
   */
  public getFieldInfo = ($state: FormStateControl) => {
    const info = { ...this.getMetaInfo(), value: $state.getFieldValue(this._name) }

    // 添加特殊标记, 用于后续优化
    Object.defineProperty(info, FIELD_MARK, { value: true })

    return info
  }

  /**
   * @description 获取字段错误信息
   */
  public getErrorInfo = (): InternalErrorInfo => {
    return pick(this.getMetaInfo(), ['name', 'warnings', 'errors'])
  }

  /**
   * @description 更新内部状态
   */
  public updateInternals = (props: OmittedInternalFormFieldProps) => {
    this._props = props

    // 如果 name 没有变，不更新 _name, _id
    if (arrayEqual(this._name, props.name)) return

    this._name = props.name

    this._id = _getId(props.name)
  }

  /**
   * @description 标记已经挂载
   */
  public markIsMounted = ($state: FormStateControl) => {
    this._mounted = true

    const current = $state.getFieldValue(this._name)

    this.__holder ??= { viewState: current }

    return current
  }

  /**
   * @description 标记已经卸载
   */
  public markIsUnmounted = () => {
    this._mounted = false

    this.triggerMetaChange()
  }

  /**
   * @description meta 信息改变的回调
   */
  private updateMetaInfo = (
    meta: Partial<{ dirty: boolean } & InternalMetaInfo>,
    callback?: (meta: Partial<InternalMetaInfo>) => void,
  ) => {
    if (!isUndefined(meta.dirty)) this._dirty = meta.dirty

    if (!isUndefined(meta.touched)) this._touched = meta.touched

    if (!isUndefined(meta.validating)) callback?.(meta)

    if (!isUndefined(meta.warnings)) this._warnings = meta.warnings

    if (!isUndefined(meta.errors)) this._errors = meta.errors

    this._mounted && this.triggerMetaChange()
  }

  /**
   * @description 由 dispatch.fieldEvent 引起的 metaInfo 更新
   */
  public updateMetaInfoByFieldEvent = () => {
    this.updateMetaInfo(fieldEventMetaInfo())
  }

  /**
   * @description 由 resetFields 引起的 metaInfo 更新
   */
  public updateMetaInfoByResetFields = () => {
    this.updateMetaInfo(resetFieldsMetaInfo(), (meta) => {
      this._validating = !!meta.validating
      this._lastValidate = VALIDATE_INITIAL
    })

    this._props.onReset?.()

    this._refreshField()
  }

  /**
   * @description setFieldsValue 引发的 metaInfo 更新
   */
  public updateMetaInfoByFieldsValue = (prev: any, next: any) => {
    const prevValue = getIn(prev, this._name)
    const nextValue = getIn(next, this._name)

    if (prevValue === nextValue) return

    this.updateMetaInfo(setFieldsValueMetaInfo(), (meta) => {
      this._validating = !!meta.validating
      this._lastValidate = VALIDATE_FINISH
    })
  }

  /**
   * @description setFieldsInfo 引发的 metaInfo 更新
   */
  public updateMetaInfoByFieldsInfo = (field: ExternalFieldInfo) => {
    this.updateMetaInfo(setFieldsInfoMetaInfo(field), (meta) => {
      if (hasOwn(meta, FIELD_MARK)) return

      this._validating = !!meta.validating
      this._lastValidate = this._validating ? Promise.resolve(null) : VALIDATE_FINISH
    })
  }

  /**
   * @description 触发外界 onMetaChange 回调
   */
  public triggerMetaChange = () => {
    const { children, onMetaChange } = this._props

    const isFunctional = isFunction(children)

    if (!onMetaChange && !isFunctional) return this._metaInfo = null

    const metaInfo = { ...this.getMetaInfo(), mounted: this._mounted }

    const different = !this._mounted || !isEqual(this._metaInfo, metaInfo)

    different && onMetaChange?.(metaInfo)

    different && isFunctional && this.forceUpdate()

    this._metaInfo = metaInfo
  }

  /**
   * @description 是否应该更新字段
   */
  public shouldUpdate = (prev: unknown, next: unknown, copied?: object) => {
    const { _id, _name, _props: { shouldUpdate: fn } } = this

    if (fn) return fn === true || fn(prev, next)

    // _id 必须有效
    if (!_id) return false

    // copied 记录了哪些字段变更过, 可直接舍弃未变更过的字段
    if (copied && !hasIn(copied, _name)) return false

    return getIn(prev, _name) !== getIn(next, _name)
  }

  /**
   * @description 字段校验
   * TODO: options?: unknown
   */
  public validate = async ($state: FormStateControl) => {
    // 校验前更新 metaInfo
    this.updateMetaInfo(beforeValidateMetaInfo(), (meta) => {
      this._validating = !!meta.validating
    })

    const lastValidate = Promise.resolve().then(async () => {
      const { _id, _mounted, _props: { rule: validator } } = this

      if (!_id || !_mounted || !validator) return null

      const promise = validator
        .validate($state.getFieldValue(this._name), { path: this._name })
        .catch((reason: any) => new FieldValidateError(reason, { path: this._name }))
        .then((result: any) => result instanceof FieldValidateError ? result : null)

      promise.then((result: any) => {
        // 本次 validate 是否过期
        if (this._lastValidate !== lastValidate) return

        this._lastValidate = VALIDATE_FINISH

        const hasError = result instanceof FieldValidateError

        const warnings = hasError ? result.warnings : []

        const errors = hasError ? result.errors : []

        // 校验后更新 metaInfo
        this.updateMetaInfo(afterValidateMetaInfo(warnings, errors), (meta) => {
          this._validating = !!meta.validating
        })
      })

      return promise
    })

    this._lastValidate = lastValidate

    return lastValidate
  }
}

/**
 * @description 虚拟字段控制类
 */
export class FakeFieldControl {
  public _name: InternalFieldName = []

  public _id = ''

  public _props = {} as OmittedInternalFormFieldProps

  constructor(name: ExternalFieldName) {
    this._name = toArray(name)
    this._id = _getId(name)
  }

  /**
   * @description 获取字段错误信息
   */
  public getErrorInfo = (): InternalErrorInfo => {
    return pick(this.getMetaInfo(), ['name', 'warnings', 'errors'])
  }

  /**
   * @description 获取字段元信息
   */
  public getMetaInfo = (): InternalMetaInfo => {
    return {
      name: this._name,
      touched: false,
      warnings: [],
      errors: [],
      validating: false,
      validated: false,
    }
  }
}
