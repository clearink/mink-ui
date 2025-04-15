import type { VoidFn } from '@mink-ui/shared'

import { isFunction, isNullish, isUndefined, toArray } from '@mink-ui/shared'
import isEqual from 'react-fast-compare'

import type {
  ExternalNamePath,
  FieldCleanBehavior,
  FormActionType,
  InternalFieldErrorInfo,
  InternalFieldInfo,
  InternalFieldMeta,
  InternalNamePath,
  MetaChangeEvent,
} from '../../_shared.props'
import type { FormStateControl } from '../../form/control'
import type { InternalFormFieldProps } from '../props'

import { FieldValidateError } from '../../utils/errors'
import { _getId } from '../../utils/path'
import { getIn } from '../../utils/value'

const FIELD_MARK = Symbol.for('_$mink-ui-form-field$_')

// 字段是否已经验证过
const VALIDATE_FINISH = Symbol.for('_$field-validate-finish$_')
const VALIDATE_INITIAL = Symbol.for('_$field-validate-initial$_')

export class FormFieldControl {
  private _getInitialValue: (() => any) | undefined

  private lastValidate: Promise<FieldValidateError | null> | symbol = VALIDATE_FINISH

  private _mounted = false

  private _dirty = false

  private refresh: () => void

  forceUpdate: () => void

  _firstState: { value: any } | undefined = undefined

  _errors: string[] = []

  _id = ''

  _name: InternalNamePath = []

  _props: Partial<InternalFormFieldProps> = {}

  // 字段是否 touch 过
  _touched = false

  _validating = false

  _preValidating = false

  _warnings: string[] = []

  // 字段卸载时的行为(处理 ListField)
  __behavior: FieldCleanBehavior = 'clean'

  // 字段是否改变过
  get dirty() {
    return this._dirty || !isUndefined(this._getInitialValue?.())
  }

  constructor(_forceUpdate: VoidFn, _refresh: VoidFn) {
    this.forceUpdate = () => { this._mounted && _forceUpdate() }

    this.refresh = () => { this._mounted && _refresh() }
  }

  setInternalFieldProps = (props: Partial<InternalFormFieldProps>) => {
    this._props = props

    if (this._name === props.name) return

    this._id = _getId(props.name)

    this._name = toArray(props.name)
  }

  setGetInitialValue = (getInitialValue: () => any) => {
    this._getInitialValue = getInitialValue
  }

  triggerMetaChange = (metaData: MetaChangeEvent) => {
    const { children, onMetaChange } = this._props

    onMetaChange?.(metaData)

    // 当 children 是函数时, 为了获得最新的 metaData 需要强制更新一次
    isFunction(children) && this.forceUpdate()
  }

  // 标记已经挂载
  markIsMounted = ($state: FormStateControl) => {
    this._mounted = true

    if (this._firstState) return

    // 缓存第一次视图值
    this._firstState = { value: $state.getFieldValue(this._name) }
  }

  // 标记已经卸载
  markIsUnmounted = () => {
    this._mounted = false

    // 卸载时触发一次 metaChange 事件
    this.triggerMetaChange({ ...this.getMetaData(), mounted: false })
  }

  // 设置卸载行为
  markCleanBehavior = (behavior: FieldCleanBehavior) => {
    this.__behavior = behavior
  }

  isFormList = () => !!this._props.isFormList

  hasInitialValue = () => !isUndefined(this._props.initialValue)

  getFieldInfo = (value: any): InternalFieldInfo => {
    const data = { ...this.getMetaData(), name: this._name, value }

    // 添加特殊标记
    Object.defineProperty(data, FIELD_MARK, { value: true })

    return data
  }

  getMetaData = (): InternalFieldMeta => {
    return {
      dirty: this.dirty,
      errors: this._errors,
      name: this._name,
      touched: this._touched,
      validating: this._validating,
      warnings: this._warnings, // TODO: 后续加上
      validated: this.lastValidate === VALIDATE_FINISH,
    }
  }

  getErrorInfo = (): InternalFieldErrorInfo => {
    return {
      name: this._name,
      errors: this._errors,
      warnings: this._warnings,
    }
  }

  // 更新 meta 属性 TODO: 需要优化
  metaUpdate = (meta: Partial<InternalFieldMeta>) => {
    const prev = this.getMetaData()

    // 同步全部的 meta 属性
    if (!isNullish(meta.dirty)) this._dirty = meta.dirty

    if (!isNullish(meta.touched)) this._touched = meta.touched

    if (!isNullish(meta.errors)) this._errors = meta.errors

    if (!isNullish(meta.warnings)) this._warnings = meta.warnings

    if (!isNullish(meta.validating)) this._validating = meta.validating

    const next = this.getMetaData()

    // 值没有改变 || 字段已经卸载了
    if (isEqual(prev, next) || !this._mounted) return

    this.triggerMetaChange({ ...next, mounted: true })
  }

  // 重置字段
  resetField = () => {
    // TODO: 优化下
    this.metaUpdate({
      touched: false,
      dirty: false,
      validating: false,
      errors: [],
      warnings: [],
    })

    this.lastValidate = VALIDATE_INITIAL

    this._props.onReset?.()

    this.refresh()
  }

  shouldUpdate = (prev: any, next: any, type: FormActionType) => {
    const { _id, _name, _props: { shouldUpdate } } = this

    if (shouldUpdate === true) return true

    if (isFunction(shouldUpdate)) return shouldUpdate(prev, next, type)

    // _id 必须有效, 否则 getIn 一直都是 undefined
    return !!_id && getIn(prev, _name) !== getIn(next, _name)
  }

  // 字段校验
  validate = (value: any) => {
    // 校验前
    this.metaUpdate({ dirty: true, errors: [], warnings: [], validating: true })

    const validatePromise = Promise.resolve().then(() => {
      const { rule: validator } = this._props

      if (!this._mounted || !this._id || !validator) return null

      const promise = validator
        .validate(value, { path: this._name })
        .catch(result => new FieldValidateError(result, { path: this._name }))
        .then(result => result instanceof FieldValidateError ? result : null)

      // 更新 meta 属性
      promise.then((result) => {
        // 判断是否过期
        if (this.lastValidate !== validatePromise) return

        this.lastValidate = VALIDATE_FINISH

        const hasError = result instanceof FieldValidateError

        const errors = hasError ? result.errors : []

        const warnings = hasError ? result.warnings : []
        // 校验后
        this.metaUpdate({ errors, warnings, validating: true })
      })

      return promise
    })

    this.lastValidate = validatePromise

    return validatePromise
  }
}

export class FakeFieldControl {
  _name: InternalNamePath

  _props: Partial<InternalFormFieldProps> = {}

  constructor(name: ExternalNamePath) {
    this._name = toArray(name)
  }

  getMetaData = () => null

  getErrorInfo = (): InternalFieldErrorInfo => {
    return {
      name: this._name,
      errors: [],
      warnings: [],
    }
  }
}
