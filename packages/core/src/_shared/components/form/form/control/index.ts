import {
  execute,
  isArray,
  isArrayEqual,
  isFunction,
  isUndefined,
  noop,
  pushItem,
  removeItem,
  toArray,
} from '@mink-ui/shared'

import type { InternalFormProviderContextState } from '../../_shared.context'
import type {
  ExternalFieldData,
  ExternalNamePath,
  FieldCleanBehavior,
  FormAction,
  InternalFieldMeta,
  InternalNamePath,
  WatchCallBack,
} from '../../_shared.props'
import type { FormFieldControl } from '../../field/control'
import type { InternalFormProps } from '../props'
import type { GetFieldsValueConfig, InternalFormInstance, InternalHooksReturn } from './props'

import { logger } from '../../../../../_shared/utils'
import { FakeFieldControl } from '../../field/control'
import { FieldsValidateError, FormValidateError } from '../../utils/errors'
import { _getId, hasSameSuffix, isParentOf } from '../../utils/path'
import { defineIn, deleteIn, getIn, merge, setIn } from '../../utils/value'
import { normalizeGetFieldsValueOptions, normalizeIsFieldsTouchedOptions } from '../utils/helpers'

export const HOOK_MARK = Symbol.for('_$mink$_')

export default class FormControl<State = any> {
  $controls: FormControlsControl

  $dispatch: FormDispatchControl<State>

  $initial: FormInitialControl

  $props: FormPropsControl

  $state: FormStateControl

  constructor(public forceUpdate: () => void) {
    this.$props = new FormPropsControl(forceUpdate)

    this.$controls = new FormControlsControl()

    this.$state = new FormStateControl<State>(this.$controls)

    this.$initial = new FormInitialControl<State>(
      this.$props,
      this.$state,
      this.$controls,
    )

    this.$dispatch = new FormDispatchControl<State>(
      this.$props,
      this.$state,
      this.$controls,
      this.$initial,
    )
  }

  /**
   * @private
   * @zh-CN 访问内部属性(不要随意使用)
   */
  private getInternalHooks = (secret: symbol): InternalHooksReturn | undefined => {
    const matched = secret === HOOK_MARK

    if (process.env.NODE_ENV !== 'production') {
      logger(!matched, '`getInternalHooks` is internal usage. Should not call directly.')
    }

    if (!matched) return undefined

    const { $dispatch, $controls, $initial, $props } = this
    const { $dependencies, $watch } = $dispatch

    return {
      dispatch: $dispatch.dispatch,
      registerField: $dispatch.registerField,
      setFields: $dispatch.setFields,
      updateControlsMap: $controls.updateControlsMap,
      registerWatch: $watch.registerWatch,
      setInternalFormProps: $props.setInternalFormProps,
      collectDependencies: $dependencies.collectDependencies,
      updateDependencies: $dependencies.updateDependencies,
      mergeInitialValues: $initial.mergeInitialValues,
      initInitialValue: $initial.initInitialValue,
    }
  }

  // 向外暴露的函数
  injectForm = (): InternalFormInstance<State> => {
    const { $controls, $dispatch, $state } = this

    return {
      /** @private */
      getInternalHooks: this.getInternalHooks,

      getFieldError: $controls.getFieldError,
      getFieldValue: $state.getFieldValue,

      getFieldsError: $controls.getFieldsError,
      getFieldsValue: $state.getFieldsValue,

      isFieldTouched: $controls.isFieldTouched,

      isFieldValidating: $controls.isFieldValidating,
      isFieldsTouched: $controls.isFieldsTouched,

      isFieldsValidating: $controls.isFieldsValidating,
      resetFields: $dispatch.resetFields,

      setFieldValue: $dispatch.setFieldValue,
      setFieldsValue: $dispatch.setFieldsValue,

      submitForm: $dispatch.submitForm,

      validateField: $dispatch.validateField,
      validateFields: $dispatch.validateFields,
    }
  }
}

/**
 * @zh-CN 负责 Form 组件的 props
 */
export class FormPropsControl {
  _formProvider: InternalFormProviderContextState | undefined

  _props: Partial<InternalFormProps> = {}

  get isFunctional() {
    return isFunction(this._props.children)
  }

  constructor(public forceUpdate: () => void) {}

  setInternalFormProps = (
    props: Partial<InternalFormProps>,
    formProvider: InternalFormProviderContextState,
  ) => {
    this._props = props
    this._formProvider = formProvider
  }

  // 是否保留字段值
  isKeepFieldValue = (control: FormFieldControl) => {
    const { preserve: formPreserve } = this._props

    const { preserve: fieldPreserve } = control._props

    return fieldPreserve ?? formPreserve ?? true
  }
}

/**
 * @zh 负责字段 dependencies 依赖
 */
export class FormDependenciesControl {
  private _dependencies = new Map<string, Set<FormFieldControl>>()

  // 遍历所依赖的字段
  traverseDependencies = (controls: FormFieldControl[], uniqueControls: Set<FormFieldControl>) => {
    if (!controls.length) return

    const nextControls: FormFieldControl[] = []

    const dependencies = this._dependencies

    controls.forEach((control) => {
      dependencies.get(control._id)?.forEach((field) => {
        // 避免爆栈
        if (uniqueControls.has(field)) return

        nextControls.push(field)

        uniqueControls.add(field)
      })
    })

    this.traverseDependencies(nextControls, uniqueControls)
  }

  // 收集字段依赖
  collectDependencies = (control: FormFieldControl) => {
    const { dependencies = [] } = control._props

    const graph = this._dependencies

    dependencies.forEach((item) => {
      // 被依赖项名称
      const targetId = _getId(item)

      // 去除空白字段与自身
      if (!targetId || targetId === control._id) return

      const controls = graph.get(targetId) || new Set()

      graph.set(targetId, controls.add(control))
    })

    return () => { this.cleanDependencies(control) }
  }

  // 清除字段依赖
  cleanDependencies = (control: FormFieldControl) => {
    this._dependencies.forEach((controls, key) => {
      controls.delete(control)

      // 没有依赖项了，删除该字段的依赖关系记录
      if (!controls.size) this._dependencies.delete(key)
    })
  }

  // 更新字段依赖
  updateDependencies = (control: FormFieldControl) => {
    this.cleanDependencies(control)

    this.collectDependencies(control)
  }
}

/**
 * @zh-CN 负责 useWatch
 */
export class FormWatchValueControl {
  private _watchList = new Set<WatchCallBack>()

  publishWatch = () => { this._watchList.forEach(execute) }

  // 通知监听字段
  registerWatch = (callback: WatchCallBack) => {
    this._watchList.add(callback)

    return () => {
      this._watchList.delete(callback)
    }
  }
}

/**
 * @zh-CN 负责字段初始化
 */
export class FormInitialControl<State = any> {
  private _initialValues = {} as Partial<State>

  constructor(
    private $props: FormPropsControl,
    private $state: FormStateControl<State>,
    private $controls: FormControlsControl,
  ) {}

  getInitialValue = (name: ExternalNamePath) => {
    return getIn(this._initialValues, toArray(name))
  }

  // 合并 Form 初始值
  mergeInitialValues = (initialValues: Partial<State> | undefined) => {
    this._initialValues = initialValues || {}

    // 初始值不能覆盖当前值
    this.$state.mergeFieldsValue(this._initialValues, this.$state._state)
  }

  // 初始化字段值
  initInitialValue = (control: FormFieldControl) => {
    const { initialValue } = control._props

    // name 不合法 || 没有初始值
    if (!control._id || isUndefined(initialValue)) return

    const currentValue = this.$state.getFieldValue(control._name)

    // 已经有值了
    if (!isUndefined(currentValue)) return

    this.$state.setFieldValue(control._name, initialValue)
  }

  // 在某些场景下触发一次额外的更新
  triggerTwiceUpdate = (control: FormFieldControl, fieldDisplay: any) => {
    const { shouldUpdate } = control._props

    if (shouldUpdate === true) return control.forceUpdate()

    const fieldCurrent = this.$state.getFieldValue(control._name)

    if (fieldDisplay !== fieldCurrent) control.forceUpdate()
  }

  // 确保已经初始化字段值
  ensureInitialValue = (control: FormFieldControl) => {
    const { $state, $controls } = this

    const { isFormList, initialValue: fieldInitial } = control._props

    // name 不合法 || 没有字段级别的初始值
    if (!control._id || isUndefined(fieldInitial)) return

    // 设置了 Form 级别的初始值
    if (!isUndefined(this.getInitialValue(control._name))) {
      if (process.env.NODE_ENV !== 'production') {
        logger(
          true,
          `Form already set 'initialValues' with path '${control._name.join('.')}', Field can not overwrite it`,
        )
      }

      return
    }

    const controls = this.$controls._map.get(control._id) || []
    // 有多个设置了 initialValue 的同名字段
    if (controls.filter(ctrl => ctrl.hasInitialValue()).length > 1) {
      if (process.env.NODE_ENV !== 'production') {
        logger(
          true,
          `Multiple Field with path '${control._name.join('.')}' set 'initialValue'. Can not decide which one to pick.`,
        )
      }

      return
    }

    // 修正字段初始值
    const fieldCurrent = $state.getFieldValue(control._name)

    if (isUndefined(fieldCurrent)) return $state.setFieldValue(control._name, fieldInitial)

    // 不是 Form.List 字段 || 不存在 complex 的子字段
    if (!isFormList || !$controls.hasComplexListFieldControl(control)) return

    // 需要合并 list 的每一项值(且以 fieldCurrent 为准)
    return $state.setFieldValue(control._name, fieldCurrent.map((e, i) => merge(fieldInitial[i], e)))
  }

  cleanFieldInitialValue = (control: FormFieldControl) => {
    const { $controls, $state, $props } = this

    const { isListField } = control._props

    // name 不合法 || 需要保留数据
    if (!control._id || $props.isKeepFieldValue(control)) return

    // 存在同名字段未被卸载
    if ($controls._map.has(control._id)) return

    // simple 字段 由 Form.List 直接管理
    if (isListField && isListField.type === 'simple') return

    // 已经标记为需要保留的字段
    if (isListField && control.__behavior === 'keep') return

    // Form.List 还没有卸载, 直接删除复杂字段的值
    const initialValue = isListField && control.__behavior === 'clean'
      ? undefined
      : this.getInitialValue(control._name)

    if (isUndefined(initialValue)) return $state.deleteFieldValue(control._name)

    // 与初始值相同
    if (initialValue === $state.getFieldValue(control._name)) return

    return $state.setFieldValue(control._name, initialValue)
  }

  // 清除 Form.List 字段值
  cleanListInitialValue = (control: FormFieldControl) => {
    // 根据是否保留 Form.List 的值觉得子字段的行为
    const behavior = this.$props.isKeepFieldValue(control) ? 'keep' : 'none'

    // TODO: 是否叠加上 listControl 自身的 __behavior ?
    this.$controls.markFormListChildrenBehavior(control, behavior)

    // 视为普通字段
    return this.cleanFieldInitialValue(control)
  }

  // 清除字段值
  cleanInitialValue = (control: FormFieldControl) => {
    const { isFormList } = control._props

    if (isFormList) return this.cleanListInitialValue(control)

    return this.cleanFieldInitialValue(control)
  }

  // 获取字段初始值
  getFieldInitialValue = (controls: FormFieldControl[]) => {
    // 1. 尝试获取对应 Form.List 上对应字段的初始值
    for (let i = 0; i < controls.length; i++) {
      const control = controls[i]

      const { isListField } = control._props

      if (!isListField) continue

      const { listPath } = isListField

      const listControl = this.$controls._map.get(_getId(listPath))?.find((ctrl) => {
        return ctrl.hasInitialValue() && ctrl.isFormList()
      })

      if (!listControl) continue

      const namePath = control._name.slice(listPath.length)

      const fieldInitial = getIn(listControl._props.initialValue, namePath)

      if (!isUndefined(fieldInitial)) return fieldInitial
    }

    // 2. 检查自身是否有 initialValue
    const pureControl = controls.find(ctrl => ctrl.hasInitialValue())

    if (pureControl) return pureControl._props.initialValue
  }

  // 重置为字段初始值
  resetInitialValues = (
    controlsMap: Map<string, FormFieldControl[]>,
    hasNameList: boolean,
  ) => {
    const { $state } = this

    const prev = $state._state

    // 未提供 nameList, 全部重置为初始值
    if (!hasNameList) $state.mergeFieldsValue({}, this._initialValues)

    controlsMap.forEach((controls, id) => {
      if (!id || !controls.length) return

      const namePath = controls[0]._name

      const formInitial = this.getInitialValue(namePath)

      if (!isUndefined(formInitial)) {
        // 重置全部 && 都不是 Form.List
        if (!hasNameList && controls.every(ctrl => !ctrl.isFormList())) return

        if (formInitial === $state.getFieldValue(namePath)) return

        $state.setFieldValue(namePath, formInitial)
      }
      else {
        const fieldInitial = this.getFieldInitialValue(controls)

        if (isUndefined(fieldInitial)) return hasNameList && $state.deleteFieldValue(namePath)

        if (fieldInitial === $state.getFieldValue(namePath)) return

        $state.setFieldValue(namePath, fieldInitial)
      }
    })

    return [prev, $state._state]
  }
}

/**
 * @zh-CN 负责字段 controls
 */
export class FormControlsControl {
  _list: FormFieldControl[] = []

  _map = new Map<string, FormFieldControl[]>()

  // 注册 FormFieldControl
  registerControl = (control: FormFieldControl, $initial: FormInitialControl) => {
    control.setGetInitialValue(() => $initial.getInitialValue(control._name))

    pushItem(this._list, control)

    this._map.set(control._id, pushItem(this._map.get(control._id) || [], control))

    return () => {
      removeItem(this._list, control)

      const cache = removeItem(this._map.get(control._id) || [], control)

      if (!cache.length) this._map.delete(control._id)
    }
  }

  // 更新 Map 关系
  updateControlsMap = (control: FormFieldControl, preName: InternalNamePath) => {
    const prevId = _getId(preName)

    const prevControls = removeItem(this._map.get(prevId) || [], control)

    if (prevControls.length === 0) this._map.delete(prevId)

    const currControls = this._map.get(control._id) || []

    // 避免重复
    if (currControls.includes(control)) return

    this._map.set(control._id, pushItem(currControls, control))
  }

  // 获取指定 Form.List 下所有的 controls
  getFormListFieldControls = (listControl: FormFieldControl) => {
    return this._list.filter((control) => {
      const { isListField } = control._props

      return isListField && isArrayEqual(isListField.listPath, listControl._name)
    })
  }

  // 是否存在指定 listControl 的 complex 子字段
  hasComplexListFieldControl = (listControl: FormFieldControl) => {
    return this
      .getFormListFieldControls(listControl)
      .some((control) => {
        const { isListField } = control._props

        return !!isListField && isListField.type === 'complex'
      })
  }

  // 设置指定 Form.List 下的所有 listField 在卸载时的行为
  markFormListChildrenBehavior = (listControl: FormFieldControl, behavior: FieldCleanBehavior) => {
    this
      .getFormListFieldControls(listControl)
      .forEach((control) => { control.markCleanBehavior(behavior) })
  }

  // 获取全部字段值的 controls
  getGetFieldsValueControls = (nameList: ExternalNamePath[] | undefined) => {
    if (isUndefined(nameList)) return this._list.filter(ctrl => ctrl._id)

    const visited = new Set<string>()

    return nameList.reduce((result, namePath) => {
      const id = _getId(namePath)

      if (!id || visited.has(id)) return result

      visited.add(id)

      const cache = this._map.get(id)

      // 取最后一个同名字段
      if (cache) pushItem(result, cache[cache.length - 1])
      else result.push(new FakeFieldControl(namePath))

      return result
    }, [] as (FakeFieldControl | FormFieldControl)[])
  }

  // 获取字段错误信息的 controls(注: 与 getGetFieldsValueControls 一致)
  getFieldsErrorControls = (nameList: ExternalNamePath[] | undefined) => {
    return this.getGetFieldsValueControls(nameList)
  }

  // 获取全部字段
  getGetFieldsControls = (nameList: ExternalNamePath[] | undefined) => {
    if (isUndefined(nameList)) return this._list.filter(ctrl => ctrl._id)

    const visited = new Set<string>()

    return nameList.reduce((result, namePath) => {
      const id = _getId(namePath)

      const cache = this._map.get(id)

      if (!id || !cache || visited.has(id)) return result

      visited.add(id)

      return pushItem(result, cache)
    }, [] as FormFieldControl[])
  }

  // 获取字段校验的 controls
  getFieldsValidatingControls = (nameList: ExternalNamePath[] | undefined) => {
    if (isUndefined(nameList)) return this._list

    const visited = new Set<string>()

    return nameList.reduce((result, namePath) => {
      const id = _getId(namePath)

      const cache = this._map.get(id)

      if (!cache || visited.has(id)) return result

      visited.add(id)

      return pushItem(result, cache)
    }, [] as FormFieldControl[])
  }

  // 获取字段是否 touched 的 controls
  getFieldsTouchedControls = (nameList: ExternalNamePath[] | undefined) => {
    if (isUndefined(nameList)) return [this._list.filter(ctrl => ctrl._id)]

    const result = new Map<string, FormFieldControl[]>()

    this._map.forEach((controls, _id) => {
      if (!_id) return

      const childPath = controls[0]._name

      // 找自身与子级
      nameList.forEach((parentPath) => {
        const pid = _getId(parentPath)

        if (!isParentOf(toArray(parentPath), childPath)) return

        result.set(pid, pushItem(result.get(pid) || [], controls))
      })
    })

    return Array.from(result.values())
  }

  // 获取字段校验的 controls TODO: 后续添加 options
  getValidateFieldsControls = (nameList: ExternalNamePath[] | undefined) => {
    if (isUndefined(nameList)) {
      return this._list.filter(ctrl => ctrl._id && ctrl._props.rule)
    }

    const visited = new Set<string>()

    return nameList.reduce((result, namePath) => {
      const id = _getId(namePath)

      const cache = this._map.get(id)

      if (!id || !cache || visited.has(id)) return result

      visited.add(id)

      return pushItem(result, cache.filter(ctrl => ctrl._props.rule))
    }, [] as FormFieldControl[])
  }

  // 获取 resetFields 时需要重置字段的 controls 情况-3
  getResetFieldsControlsMap = (nameList: ExternalNamePath[] | undefined) => {
    const controlsMap = new Map<string, FormFieldControl[]>()

    const formListMap = new Map<string, FormFieldControl[]>()

    const mergedNameList = isUndefined(nameList)
      ? Array.from(this._map.values(), list => list[0]._name)
      : nameList

    const visited = new Set<string>()

    mergedNameList.forEach((namePath) => {
      const id = _getId(namePath)

      const controls = this._map.get(id)

      if (!controls || visited.has(id)) return

      visited.add(id)

      const hasFormList = controls.some(ctrl => ctrl.isFormList())

      if (hasFormList) formListMap.set(id, controls)
      else controlsMap.set(id, controls)
    })

    // 需要保证 Form.List 的子字段在其后面被重置(按照 registerField 顺序)
    formListMap.forEach((controls, key) => { controlsMap.set(key, controls) })

    return controlsMap
  }

  getFieldError = (namePath: ExternalNamePath) => {
    const controls = this.getFieldsError([namePath])
    return controls[0].errors
  }

  getFieldsError = (nameList?: ExternalNamePath[]) => {
    return this
      .getFieldsErrorControls(nameList)
      .map(ctrl => ctrl.getErrorInfo())
  }

  isFieldTouched = (namePath: ExternalNamePath) => {
    return this.isFieldsTouched([namePath])
  }

  isFieldsTouched = (nameList?: boolean | ExternalNamePath[], allFieldsTouched?: boolean) => {
    const [_nameList, checkEveryone] = normalizeIsFieldsTouchedOptions(nameList, allFieldsTouched)

    const controls = this.getFieldsTouchedControls(_nameList)

    if (isUndefined(_nameList)) {
      return checkEveryone
        ? controls[0].every(ctrl => ctrl._touched || ctrl.isFormList())
        : controls[0].some(ctrl => ctrl._touched)
    }

    return checkEveryone
      ? controls.every(list => list.some(ctrl => ctrl._touched))
      : controls.some(list => list.some(ctrl => ctrl._touched))
  }

  isFieldValidating = (namePath: ExternalNamePath) => {
    return this.isFieldsValidating([namePath])
  }

  isFieldsValidating = (nameList?: ExternalNamePath[]) => {
    return this
      .getFieldsValidatingControls(nameList)
      .some(ctrl => !!ctrl._validating)
  }

  // 更新 setFieldsValue 操作的 meta 属性
  updateSetFieldsValueControlsMeta = (prev: any, next: any) => {
    this._list.forEach((control) => {
      const { _id, _name } = control

      // 没有合法的名称 || 字段值不变
      if (!_id || getIn(prev, _name) === getIn(next, _name)) return

      // TODO: 确认一下
      // validatePromise = null
      control.metaUpdate({
        touched: true,
        dirty: true,
        validating: false,
        errors: [],
        warnings: [],
      })
    })
  }

  // 更新 setFields 操作的 meta 属性
  updateSetFieldsControlsMeta = (fields: ExternalFieldData[]) => {
    fields.forEach((field) => {
      const cache = this._map.get(_getId(field.name)) || []

      // TODO: 确认一下
      cache.forEach((ctrl) => { ctrl.metaUpdate(field as any) })
    })
  }
}

/**
 * @zh-CN 负责表单数据
 */
export class FormStateControl<State = any> {
  _state = {} as State

  constructor(private $controls: FormControlsControl) {}

  deleteFieldValue = (namePath: InternalNamePath) => {
    const prev = this._state

    this._state = deleteIn(this._state, namePath)

    return [prev, this._state] as const
  }

  getFields = (nameList?: ExternalNamePath[]) => {
    return this
      .$controls
      .getGetFieldsControls(nameList)
      .map(ctrl => ctrl.getFieldInfo(this.getFieldValue(ctrl._name)))
  }

  getFieldValue = (namePath: ExternalNamePath) => {
    return getIn(this._state, toArray(namePath))
  }

  getFieldsValue = (
    nameList?: ExternalNamePath[] | GetFieldsValueConfig | true,
    filter?: (meta: InternalFieldMeta | null) => boolean,
  ) => {
    const [strict, _nameList, _filter] = normalizeGetFieldsValueOptions(nameList, filter)

    const current = this._state

    if (_nameList === true && !_filter) return current

    const hasNameList = !isUndefined(_nameList)

    return this
      .$controls
      .getGetFieldsValueControls(isArray(_nameList) ? _nameList : undefined)
      .reduce((values, control) => {
        const { _name } = control

        const { isFormList, isListField } = control._props

        // 严格策略下, 跳过 Form.List 的赋值
        if (strict && isFormList) return values

        // 非严格策略下 && 跳过 ListField 的赋值 && 没有指明 nameList
        if (!strict && isListField && !hasNameList) return values

        // 不满足过滤条件
        if (_filter && !_filter(control.getMetaData())) return values

        return defineIn(values, _name, getIn(current, _name))
      }, {} as State)
  }

  setFieldValue = (namePath: ExternalNamePath, value: any) => {
    const prev = this._state

    const path = toArray(namePath)

    if (!path.length) return [prev, prev] as const

    this._state = setIn(this._state, path, value)

    return [prev, this._state] as const
  }

  setFieldsData = (fields: ExternalFieldData[]) => {
    const prev = this._state

    fields.forEach((e) => { 'value' in e && this.setFieldValue(e.name, e.value) })

    return [prev, this._state] as const
  }

  mergeFieldsValue = (base: Partial<State>, state: Partial<State>) => {
    const prev = this._state

    this._state = merge(base, state) as State

    return [prev, this._state] as const
  }
}

/**
 * @zh-CN 负责调度逻辑
 */
export class FormDispatchControl<State = any> {
  private lastValidate: null | Promise<FieldsValidateError | null> = null

  $dependencies = new FormDependenciesControl()

  $watch = new FormWatchValueControl()

  constructor(
    private $props: FormPropsControl,
    private $state: FormStateControl<State>,
    private $controls: FormControlsControl,
    private $initial: FormInitialControl,
  ) {}

  private updateControl = (filter: (control: FormFieldControl) => boolean) => {
    let controls: FormFieldControl[] = []

    if (this.$props.isFunctional) this.$props.forceUpdate()
    else controls = this.$controls._list.filter(filter)

    controls.forEach((control) => { control.forceUpdate() })

    return controls
  }

  // 调度方法
  dispatch = (action: FormAction) => {
    const { $watch, $state, $controls, $initial } = this

    // 注册字段
    if (action.type === 'registerField') {
      const { type, control, fieldDisplay } = action

      const [prev, next] = $initial.ensureInitialValue(control) || []

      control.markIsMounted()

      $initial.triggerTwiceUpdate(control, fieldDisplay)

      if (isUndefined(prev) || isUndefined(next)) return

      this.updateControl((ctrl) => {
        // 字段 shouldUpdate === true 已在注册时额外 forceUpdate
        if (ctrl._props.shouldUpdate === true) return false

        // 具有相同的父路径或者是同一个路径
        if (hasSameSuffix(control._name, ctrl._name)) return true

        // 满足自定义逻辑
        return ctrl.shouldUpdate(prev, next, type)
      })

      // 通知监听事件
      $watch.publishWatch()

      return
    }

    // 卸载字段
    if (action.type === 'unregisterField') {
      const { type, control } = action

      const [prev, next] = $initial.cleanInitialValue(control) || []

      control.markIsUnmounted()

      if (isUndefined(prev) || isUndefined(next)) return

      const controls = this.updateControl(ctrl => ctrl.shouldUpdate(prev, next, type))

      // 通知监听事件
      $watch.publishWatch()

      // 通知依赖该字段的其他字段
      this.publishDependentControl(controls)

      return
    }

    // 触发对应事件
    if (action.type === 'fieldEvent') {
      const { type, control, value } = action

      const [prev, next] = $state.setFieldValue(control._name, value)

      // 更新字段 meta 属性
      control.metaUpdate({ dirty: true, touched: true })

      const controls = this.updateControl((ctrl) => {
        // name 合法 && 同名字段
        if (ctrl._id && ctrl._id === control._id) return true

        return ctrl.shouldUpdate(prev, next, type)
      })

      // 通知监听事件
      $watch.publishWatch()

      // 通知依赖该字段的其他字段
      const dependencies = this.publishDependentControl(controls)

      // 触发 onValuesChange 事件
      this.triggerOnValuesChange(next, control._name)

      // 触发 onFieldsChange 事件
      this.triggerOnFieldsChange([control, ...dependencies])

      return
    }

    // 调用 resetFields
    if (action.type === 'resetFields') {
      const { type, nameList } = action

      const hasNameList = !isUndefined(nameList)

      const controlsMap = $controls.getResetFieldsControlsMap(nameList)

      const [prev, next] = $initial.resetInitialValues(controlsMap, hasNameList)

      this.updateControl((ctrl) => {
        if (!hasNameList || controlsMap.has(ctrl._id)) return false

        return ctrl.shouldUpdate(prev, next, type)
      })

      // 重置相关字段
      controlsMap.forEach((list) => { list.forEach((ctrl) => { ctrl.resetField() }) })

      // 通知监听事件
      $watch.publishWatch()

      return
    }

    // 调用 setFieldsValue
    if (action.type === 'setFieldsValue') {
      const { type, state } = action

      const [prev, next] = $state.mergeFieldsValue($state._state, state)

      this.updateControl(ctrl => ctrl.shouldUpdate(prev, next, type))

      $controls.updateSetFieldsValueControlsMeta(prev, next)

      // 通知监听事件
      $watch.publishWatch()

      return
    }

    // 调用 setFields / setFieldValue
    if (action.type === 'setFields') {
      const { type, fields } = action

      const [prev, next] = $state.setFieldsData(fields)

      this.updateControl(ctrl => ctrl.shouldUpdate(prev, next, type))

      $controls.updateSetFieldsControlsMeta(fields)

      // 通知监听事件
      $watch.publishWatch()
    }
  }

  // 通知依赖字段
  publishDependentControl = (controls: FormFieldControl[]) => {
    const dependencies = new Set<FormFieldControl>()

    this.$dependencies.traverseDependencies(controls, dependencies)

    // 相关字段触发一次更新
    dependencies.forEach((ctrl) => { ctrl.forceUpdate() })

    const updateControls = Array.from(dependencies)

    const nameList = updateControls.map(ctrl => ctrl._name)

    if (nameList.length) this.validateFields(nameList)

    return updateControls
  }

  // 注册字段
  registerField = (control: FormFieldControl, fieldDisplay: any) => {
    const unregisterControl = this.$controls.registerControl(control, this.$initial)

    this.dispatch({ type: 'registerField', control, fieldDisplay })

    return () => {
      unregisterControl()

      this.dispatch({ type: 'unregisterField', control })
    }
  }

  // 重置字段
  resetFields = (nameList?: ExternalNamePath[]) => {
    this.dispatch({ type: 'resetFields', nameList })
  }

  // 设置字段值
  setFieldValue = (name: ExternalNamePath, value: any) => {
    this.dispatch({
      type: 'setFields',
      fields: [{ name, value, errors: [], warnings: [] }],
    })
  }

  // 设置一组字段状态
  setFields = (fields: ExternalFieldData[]) => {
    this.dispatch({ type: 'setFields', fields })
  }

  // 设置多个字段值
  setFieldsValue = (state: Partial<State>) => {
    this.dispatch({ type: 'setFieldsValue', state })
  }

  /** ==================================================== */
  /** validate                                             */
  /** ==================================================== */

  // 提交表单
  submitForm = () => {
    this.validateFields().then(this.triggerOnFinish, this.triggerOnFailed)
  }

  // 触发 onFinish 回调
  triggerOnFinish = (values: State) => {
    const { onFinish } = this.$props._props

    if (!onFinish) return

    // onFinish 不能抛出异常给 triggerOnFailed
    try { onFinish(values) }
    catch (error) { console.error(error) }
  }

  // 触发 onFailed 回调
  triggerOnFailed = (validateError: FormValidateError) => {
    this.$props._props.onFailed?.(validateError.toJSON())
  }

  // 触发 onFieldsChange 回调 TODO: 待优化
  triggerOnFieldsChange = (controls: FormFieldControl[]) => {
    const { name, onFieldsChange } = this.$props._props

    const formProvider = this.$props._formProvider

    if (!onFieldsChange && !formProvider) return

    const { getFields } = this.$state

    const changedFields = getFields(controls.map(control => control._name))

    !isUndefined(name) && formProvider?.triggerFormChange(name, changedFields)

    onFieldsChange?.(changedFields, () => getFields())
  }

  // 触发 onValuesChange 回调(只有 action.type === 'fieldEvent' 时才会触发)
  triggerOnValuesChange = (state: State, namePath: InternalNamePath) => {
    const { onValuesChange } = this.$props._props

    if (!onValuesChange) return

    const changedValues = defineIn({}, namePath, getIn(state, namePath))

    onValuesChange(changedValues, () => this.$state.getFieldsValue())
  }

  // 校验指定字段
  validateField = (namePath: ExternalNamePath) => {
    this.validateFields([namePath])
  }

  // 校验多个字段, 不传默认校验全部(TODO: 后续增加配置选项)
  validateFields = (nameList?: ExternalNamePath[]) => {
    const { $state, $controls } = this

    // 所有的校验字段
    const controls = $controls.getValidateFieldsControls(nameList)

    const promiseList = controls.map(ctrl => ctrl.validate($state.getFieldValue(ctrl._name)))

    const validatePromise = Promise.resolve().then(() => {
      return Promise.allSettled(promiseList)
        .then(results => FieldsValidateError.from(results))
        .then(errors => errors instanceof FieldsValidateError ? errors : null)
    })

    this.lastValidate = validatePromise

    this.triggerOnFieldsChange(controls)

    const returnPromise = validatePromise.then<State>((errors) => {
      this.triggerOnFieldsChange(controls)

      const hasError = errors instanceof FieldsValidateError

      const isExpired = validatePromise !== this.lastValidate

      // TODO: 后续添加 recursive 校验规则这里不能直接使用 nameList
      const values = $state.getFieldsValue(nameList)

      return !isExpired && !hasError
        ? values
        : Promise.reject(new FormValidateError(errors, isExpired, values))
    })

    // 控制台不展示错误信息
    returnPromise.catch(noop)

    return returnPromise as Promise<State>
  }
}
