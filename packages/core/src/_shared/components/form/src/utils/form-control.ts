import type { VoidFn } from '@mink-ui/shared/interface'
import type { InternalFormProviderContextState, InternalFormSharedContextState } from '../_shared.context'
import type {
  DispatchAction,
  ExternalFieldInfo,
  ExternalFieldName,
  GetFieldsValueFunction,
  InternalFieldName,
  InternalFormInstance,
  InternalHooksReturn,
  IsFieldsTouchedFunction,
  ScheduleFunction,
  ScheduleTasks,
  WatchCallBack,
} from '../_shared.props'
import type { ScheduleCallback } from '../form-scheduler.props'
import type { OmittedInternalFormProps, PickedInternalFormProps } from '../form.props'
import type { FormFieldControl } from './field-control'
import type { FormListControl } from './list-control'

import isEqual from 'react-fast-compare'
import { atIndex } from '@mink-ui/shared/array/at-index'
import { pushItem } from '@mink-ui/shared/array/push-item'
import { removeItem } from '@mink-ui/shared/array/remove-item'
import { toArray } from '@mink-ui/shared/array/to-array'
import { fallback } from '@mink-ui/shared/function/fallback'
import { noop } from '@mink-ui/shared/function/noop'
import { isArray } from '@mink-ui/shared/is/is-array'
import { isFunction } from '@mink-ui/shared/is/is-function'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'

import { logger } from '../../../../utils/logger'
import { HOOKS_SECRET } from '../_shared.constant'
import { FieldsValidateError, FormValidateError } from './error'
import { FakeFieldControl } from './field-control'
import { normalizeGetFieldsValueOptions, normalizeIsFieldsTouchedOptions } from './helpers'
import { _getId, getIn, hasIn, relation } from './path'
import { defineIn, deleteIn, mergeIn } from './value'

export class FormControl<S = any> {
  private $other: FormOtherControl

  private $state: FormStateControl

  private $scheduler: FormSchedulerControl

  private $controls: FormControlsControl

  private $initial: FormInitialControl

  private $dispatch: FormDispatchControl

  constructor(forceUpdate: VoidFn) {
    this.$other = new FormOtherControl<S>(forceUpdate)

    this.$state = new FormStateControl<S>()

    this.$scheduler = new FormSchedulerControl<S>()

    this.$controls = new FormControlsControl(this.$other)

    this.$initial = new FormInitialControl<S>(
      this.$other,
      this.$state,
      this.$scheduler,
      this.$controls,
    )

    this.$dispatch = new FormDispatchControl<S>(
      this.$other,
      this.$state,
      this.$scheduler,
      this.$controls,
      this.$initial,
    )
  }

  /**
   * @private
   * @description 获取内部函数
   */
  private getInternalHooks = (secret: symbol): InternalHooksReturn | undefined => {
    if (secret !== HOOKS_SECRET) {
      if (process.env.NODE_ENV !== 'production') {
        logger.error('InternalForm', '`getInternalHooks` is internal usage. Should not call directly.')
      }
      return undefined
    }

    const { $other, $scheduler, $controls, $dispatch, $initial } = this

    return {
      dispatch: $dispatch.dispatch,
      registerField: $dispatch.registerField,
      registerWatch: $other.registerWatch,
      registerScheduler: $scheduler.registerScheduler,
      setFieldsInfo: $dispatch.setFieldsInfo,
      updateInternals: $other.updateInternals,
      defineInitialValue: $initial.defineInitialValue,
      updateControlsMap: $controls.updateControlsMap,
      updateFieldGraph: $other.updateFieldGraph,
      defineFormInitials: $dispatch.defineFormInitials,
      saveInternalFields: $dispatch.saveInternalFields,
      getFormListControl: $controls.getFormListControl,
    }
  }

  public inject = (): InternalFormInstance<S> => {
    const { $controls, $dispatch } = this

    return {
      /** @private */
      getInternalHooks: this.getInternalHooks,

      getFieldError: $controls.getFieldError,
      getFieldsError: $controls.getFieldsError,

      getFieldValue: $dispatch.getFieldValue,
      getFieldsValue: $dispatch.getFieldsValue,

      setFieldValue: $dispatch.setFieldValue,
      setFieldsValue: $dispatch.setFieldsValue,

      validateField: $dispatch.validateField,
      validateFields: $dispatch.validateFields,

      isFieldTouched: $controls.isFieldTouched,
      isFieldsTouched: $controls.isFieldsTouched,

      isFieldValidating: $controls.isFieldValidating,
      isFieldsValidating: $controls.isFieldsValidating,

      resetFields: $dispatch.resetFields,

      submitForm: $dispatch.submitForm,
    }
  }
}

/**
 * @description 表单 props, 字段 deps, watchers 及其他
 */
export class FormOtherControl<S = any> {
  /**
   * @description 表单联动
   */
  public _provider: InternalFormProviderContextState | null = null

  /**
   * @description 表单 props
   */
  public _omitted = {} as OmittedInternalFormProps<S>

  /**
   * @description 表单 props
   */
  public _picked = {} as PickedInternalFormProps<S>

  /**
   * @description 记录字段依赖关系
   */
  private _graphs = new Map<string, Set<FormFieldControl>>()

  /**
   * @description useWatch 监听事件
   */
  private _watchers = new Set<WatchCallBack>()

  constructor(public forceUpdate: VoidFn) {}

  /**
   * @description 表单是否为 render props
   */
  public isFunctional = () => {
    return isFunction(this._omitted.children)
  }

  /**
   * @description 更新内部状态
   */
  public updateInternals = (
    picked: PickedInternalFormProps<S>,
    omitted: OmittedInternalFormProps<S>,
    provider: InternalFormProviderContextState | null,
    _shared: InternalFormSharedContextState | null,
  ) => {
    this._picked = picked
    this._omitted = omitted
    this._provider = provider

    // TODO: 是否需要定义一个字段专门存储以优化性能
    // const validateMessages = {
    //   ...shared?.validateMessages,
    //   ...omitted.validateMessages,
    // }
  }

  /**
   * @description 是否保留字段值
   */
  public isKeepFieldValue = (control: FormFieldControl) => {
    const { preserve: formLevel } = this._picked

    const { preserve: fieldLevel } = control._props

    return fallback(fieldLevel, formLevel, true)!
  }

  /**
   * @description 收集依赖的字段
   */
  public collectFieldGraph = (controls: FormFieldControl[], set: Set<FormFieldControl>) => {
    if (!controls.length) return

    const next: FormFieldControl[] = []

    controls.forEach(({ _id }) => {
      const collection = this._graphs.get(_id)

      collection && collection.forEach((ctrl) => {
        if (set.has(ctrl) || !ctrl.isDirty()) return

        set.add(ctrl)

        next.push(ctrl)
      })
    })

    this.collectFieldGraph(next, set)
  }

  /**
   * @description 建立依赖关系
   */
  public buildFieldGraph = (control: FormFieldControl) => {
    const { dependencies = [] } = control._props

    dependencies.forEach((name) => {
      const id = _getId(name)

      if (!id || id === control._id) return

      const set = this._graphs.get(id) || new Set()

      this._graphs.set(id, set.add(control))
    })

    return () => { this.cleanFieldGraph(control) }
  }

  /**
   * @description 清理依赖关系
   */
  public cleanFieldGraph = (control: FormFieldControl) => {
    this._graphs.forEach((set, id) => {
      if (set.has(control)) set.delete(control)

      if (!set.size) this._graphs.delete(id)
    })
  }

  /**
   * @description 更新依赖关系
   */
  public updateFieldGraph = (control: FormFieldControl) => {
    this.cleanFieldGraph(control)

    this.buildFieldGraph(control)
  }

  /**
   * @description 注册监听事件
   */
  public registerWatch = (callback: WatchCallBack) => {
    this._watchers.add(callback)

    return () => { this._watchers.delete(callback) }
  }

  /**
   * @description 通知监听事件
   */
  public publishWatch = ($dispatch: FormDispatchControl, $scheduler: FormSchedulerControl) => {
    if (!this._watchers.size) return

    // 或许可以减少一次计算 (数据量大时提升明显)
    const values = $scheduler._events?.values || $dispatch.getFieldsValue()

    this._watchers.forEach((fn) => { fn(values) })
  }
}

/**
 * @description 数据变更
 */
export class FormStateControl<S = any> {
  /**
   * @description Form 所有状态
   */
  public _state = {} as S

  /**
   * @description 删除指定路径的数据
   */
  public deleteFieldValue = (name: InternalFieldName, copied: object) => {
    const prev = this._state

    this._state = deleteIn(prev, name, copied)

    return [prev, this._state] as const
  }

  /**
   * @description 获取指定路径的数据
   */
  public getFieldValue = (name: InternalFieldName) => {
    return getIn(this._state, name)
  }

  /**
   * @description 设置指定路径的数据
   */

  public defineFieldValue = (name: InternalFieldName, value: any, copied: object) => {
    const prev = this._state

    this._state = defineIn(this._state, name, value, copied)

    return [prev, this._state] as const
  }

  /**
   * @description 从字段信息中解析字段值
   */
  public setFieldsInfo = (fields: ExternalFieldInfo[]) => {
    const prev = this._state

    const copied = Object.create(null)

    fields.forEach((e) => { 'value' in e && this.defineFieldValue(toArray(e.name), e.value, copied) })

    return [prev, this._state, copied] as const
  }

  /**
   * @description 合并字段值
   */
  public mergeFieldsValue = (base: Partial<S>, values: Partial<S>) => {
    const prev = this._state

    this._state = mergeIn(base, values) as S

    return [prev, this._state] as const
  }
}

/**
 * @description 批量任务调度器
 */
export class FormSchedulerControl<S = any> {
  /**
   * @description 任务调度函数
   */
  private _schedule: ScheduleCallback | null = null

  /**
   * @description 任务队列
   */
  public _tasks: ScheduleTasks = Object.create(null)

  /**
   * @description 记录路径是否已拷贝过
   */
  public _copied = Object.create(null)

  /**
   * @description 表单数据的快照
   */
  public _snapshots: Partial<S> | null = null

  /**
   * @description 字段初始化时额外的数据
   */
  public _initial = {
    defined: new Set<FormFieldControl>(),
  }

  /**
   * @description 字段清除时额外的数据
   */
  public _cleanup = {
    controls: [] as FormFieldControl[],
  }

  /**
   * @description 触发事件时额外的参数
   */
  public _events = {
    updated: new Set<FormFieldControl>(),
    values: undefined as undefined | object,
    controls: [] as FormFieldControl[],
  }

  /**
   * @description 注册任务调度器
   */
  public registerScheduler = (callback: ScheduleCallback | null) => {
    this._schedule = callback

    return () => { this._schedule = null }
  }

  /**
   * @description 任务调度
   */
  public schedule: ScheduleFunction = (key, priority, factory) => {
    if (this._tasks[key]) return

    this._tasks[key] = { priority, handler: () => { factory(this._tasks) } }

    this._schedule?.(() => {
      // priority 越小，优先级越高
      const sorted = Object.values(this._tasks).sort((a, b) => a.priority - b.priority)

      sorted.forEach((task) => { task.handler() })

      // 清除本次调度所产生的临时数据
      this._tasks = Object.create(null)
      this._copied = Object.create(null)
      this._snapshots = null

      this._initial.defined.clear()

      this._cleanup.controls = []

      this._events.updated.clear()
      this._events.values = undefined
      this._events.controls = []
    })
  }
}

/**
 * @description 字段收集
 */
export class FormControlsControl {
  public _list: FormFieldControl[] = []

  public _map = new Map<string, FormFieldControl[]>()

  constructor(private $other: FormOtherControl) {}

  /**
   * @description 是否有多个同名字段且存在多个 initialValue
   */
  public hasDuplicateInitializedControls = (control: FormFieldControl) => {
    const controls = this._map.get(control._id) || []

    return controls.filter(ctrl => ctrl.hasInitialValue()).length > 1
  }

  /**
   * @description 获取 getFieldsValue 所需要的 controls
   */
  public getControlsForGetFieldsValue = (nameList: ExternalFieldName[] | undefined) => {
    const result = new Map<string, FakeFieldControl | FormFieldControl>()

    const array = new Map<string, FormFieldControl>()

    const explicit = new Map(nameList ? nameList.map(name => [_getId(name), name]) : [])

    // 未提供 nameList 时，遍历一次即可拿到所有的 control
    // 使用 map 遍历可以避免同名字段的影响
    !explicit.size && this._map.forEach((cache, _id) => {
      if (!_id) return

      const list = cache.find(ctrl => ctrl._props.isFormList)

      list ? array.set(_id, list) : result.set(_id, cache[0])
    })

    // 提供 nameList 时，根据 nameList 找到到对应的字段，没有就进行占位
    explicit.size && explicit.forEach((_name, _id) => {
      if (!_id) return

      const cache = this._map.get(_id)

      if (!cache) return result.set(_id, new FakeFieldControl(_name))

      const list = cache.find(ctrl => ctrl._props.isFormList)

      list ? array.set(_id, list) : result.set(_id, cache[0])
    })

    // 提供 nameList && array 不为空时，收集剩余的 isListField 字段
    explicit.size && array.size && this._list.forEach((ctrl) => {
      const { _id, _props: { isListField } } = ctrl

      if (!_id || !isListField || result.has(_id)) return

      if (array.has(isListField.listId)) result.set(_id, ctrl)
    })

    // 将 array 中的字段追加到 result 中
    array.forEach((ctrl, key) => { result.set(key, ctrl) })

    return Array.from(result.values())
  }

  /**
   * @description 获取 getFieldsError 所需要的 controls
   */
  public getControlsForGetFieldsError = (nameList: ExternalFieldName[] | undefined) => {
    if (isUndefined(nameList)) return this._list.filter(ctrl => ctrl._id)

    const visited = new Set<string>()

    return nameList.reduce((result, name) => {
      const _id = _getId(name)

      if (!_id || visited.has(_id)) return result

      visited.add(_id)

      const cache = this._map.get(_id)

      // 取最后一个同名字段
      return pushItem(result, cache ? atIndex(cache, -1) : new FakeFieldControl(name))
    }, [] as (FakeFieldControl | FormFieldControl)[])
  }

  /**
   * @description 获取 getFieldsInfo 所需要的 controls
   */
  public getControlsForGetFieldsInfo = (nameList: ExternalFieldName[] | undefined) => {
    if (isUndefined(nameList)) return this._list.filter(ctrl => ctrl._id)

    const visited = new Set<string>()

    return nameList.reduce((result, name) => {
      const _id = _getId(name)

      if (!_id || visited.has(_id)) return result

      visited.add(_id)

      return pushItem(result, this._map.get(_id) || [])
    }, [] as FormFieldControl[])
  }

  /**
   * @description 获取 isFieldsValidating 所需要的 controls
   */
  private getIsControlsForFieldsValidating = (nameList: ExternalFieldName[] | undefined) => {
    // 所有的 control 都可以尝试
    if (isUndefined(nameList)) return this._list

    const visited = new Set<string>()

    return nameList.reduce((result, name) => {
      const _id = _getId(name)

      if (visited.has(_id)) return result

      visited.add(_id)

      return pushItem(result, this._map.get(_id) || [])
    }, [] as FormFieldControl[])
  }

  /**
   * @description 获取字段是否 touched 的 controls
   */
  private getControlsForIsFieldsTouched = (nameList: ExternalFieldName[] | undefined) => {
    if (isUndefined(nameList)) return [this._list.filter(ctrl => ctrl._id)]

    const result = new Map<string, FormFieldControl[]>()

    const tuples = nameList.map(e => [_getId(e), toArray(e)] as const)

    this._map.forEach((controls, _id) => {
      if (!_id) return

      // 找自身与子级
      tuples.forEach(([pid, name]) => {
        if (!relation(name, controls[0]._name)) return

        result.set(pid, pushItem(result.get(pid) || [], controls))
      })
    })

    return Array.from(result.values())
  }

  /**
   * @description 获取字段校验的 controls TODO: 后续添加 options
   */
  public getControlsForValidateFields = (nameList: ExternalFieldName[] | undefined) => {
    if (isUndefined(nameList)) {
      return this._list.filter(ctrl => ctrl._id && ctrl._props.rule)
    }

    const visited = new Set<string>()

    return nameList.reduce((result, name) => {
      const id = _getId(name)

      if (!id || visited.has(id)) return result

      visited.add(id)

      const cache = this._map.get(id) || []

      return pushItem(result, cache.filter(ctrl => ctrl._props.rule))
    }, [] as FormFieldControl[])
  }

  /**
   * @description 获取 resetFields 时需要的 controls
   * 这里的逻辑似乎有问题，需要重新整理
   */
  public getControlsForResetFields = (nameList: ExternalFieldName[] | undefined) => {
    const result = new Map<string, FormFieldControl[]>()

    const array = new Map<string, FormFieldControl[]>()

    const explicit = new Map(nameList ? nameList.map(name => [_getId(name), name]) : [])

    // 未提供 nameList 时，遍历一次即可拿到所有的 control
    !explicit.size && this._map.forEach((cache, _id) => {
      const hasFormList = cache.some(ctrl => ctrl._props.isFormList)

      hasFormList ? array.set(_id, cache) : result.set(_id, cache)
    })

    // 提供 nameList 时，根据 nameList 找到到对应的字段
    explicit.size && explicit.forEach((_name, _id) => {
      const cache = this._map.get(_id)

      if (!cache) return

      const hasFormList = cache.some(ctrl => ctrl._props.isFormList)

      hasFormList ? array.set(_id, cache) : result.set(_id, cache)
    })

    // array 不为空时，将 ListField 的 behavior 设置为 keep
    array.size && this._list.forEach((ctrl) => {
      const { isListField } = ctrl._props

      if (!isListField || !array.has(isListField.listId)) return

      ctrl.updateKeepValueBehavior(true)
    })

    // 将 array 中的字段追加到 result 中
    array.forEach((controls, key) => { result.set(key, controls) })

    return result
  }

  /**
   * @description 更新 resetFields 操作的 meta 属性
   */
  public updateMetaInfoByResetFields = (resets: Map<string, FormFieldControl[]>) => {
    resets.forEach((list) => {
      list.forEach((ctrl) => { ctrl.updateMetaInfoByResetFields() })
    })
  }

  /**
   * @description 更新 setFieldsValue 操作的 meta 属性
   */
  public updateMetaInfoByFieldsValue = (prev: any, next: any) => {
    this._list.forEach((ctrl) => { ctrl.updateMetaInfoByFieldsValue(prev, next) })
  }

  /**
   * @description 更新 setFieldsInfo 操作的 meta 属性
   */
  public updateMetaInfoByFieldsInfo = (fields: ExternalFieldInfo[]) => {
    fields.forEach((field) => {
      const cache = this._map.get(_getId(field.name)) || []

      cache.forEach((ctrl) => { ctrl.updateMetaInfoByFieldsInfo(field) })
    })
  }

  /**
   * @description 获取字段错误信息
   */
  public getFieldError = (name: ExternalFieldName) => {
    const controls = this.getFieldsError([name])

    return controls[0]?.errors
  }

  /**
   * @description 获取一组字段错误信息
   */
  public getFieldsError = (nameList?: ExternalFieldName[]) => {
    return this
      .getControlsForGetFieldsError(nameList)
      .map(ctrl => ctrl.getErrorInfo())
  }

  /**
   * @description 字段是否触摸过
   */
  public isFieldTouched = (name: ExternalFieldName) => {
    return this.isFieldsTouched([name])
  }

  /**
   * @description 一组字段是否触摸过
   */
  public isFieldsTouched: IsFieldsTouchedFunction = (arg1: any, arg2?: any) => {
    const [nameList, checkEveryone] = normalizeIsFieldsTouchedOptions(arg1, arg2)

    const controls = this.getControlsForIsFieldsTouched(nameList)

    if (isUndefined(nameList)) {
      return checkEveryone
        ? controls[0].every(ctrl => ctrl.isTouched() || ctrl._props.isFormList)
        : controls[0].some(ctrl => ctrl.isTouched())
    }

    return checkEveryone
      ? controls.every(list => list.some(ctrl => ctrl.isTouched()))
      : controls.some(list => list.some(ctrl => ctrl.isTouched()))
  }

  /**
   * @description 字段是否处于校验中
   */
  public isFieldValidating = (name: ExternalFieldName) => {
    return this.isFieldsValidating([name])
  }

  /**
   * @description 一组字段是否处于校验中
   */
  public isFieldsValidating = (nameList?: ExternalFieldName[]) => {
    return this
      .getIsControlsForFieldsValidating(nameList)
      .some(ctrl => ctrl.isValidating())
  }

  /**
   * @description 注册字段
   */
  public registerControl = (control: FormFieldControl, $initial: FormInitialControl) => {
    control.setGetInitialValue(() => $initial.getFieldInitialValue(control))

    pushItem(this._list, control)

    this._map.set(control._id, pushItem(this._map.get(control._id) || [], control))

    return () => {
      removeItem(this._list, control)

      const cache = removeItem(this._map.get(control._id) || [], control)

      if (!cache.length) this._map.delete(control._id)
    }
  }

  /**
   * @description 更新 Form.List 子字段在卸载时的行为
   */
  public updateListFieldBehavior = (control: FormFieldControl) => {
    const { isFormList } = control._props

    // 如果 Form.List 自身需要保持数据，则其子字段也强制需要 (不用判断 preserve)
    const keepValue = control.__keepValue || this.$other.isKeepFieldValue(control)

    isFormList && this._list.forEach((ctrl) => {
      const { isListField } = ctrl._props

      if (!isListField || isListField.listControl !== isFormList.listControl) return

      ctrl.updateKeepValueBehavior(keepValue)
    })
  }

  /**
   * @description 更新 map 关系
   */
  public updateControlsMap = (control: FormFieldControl, preName: InternalFieldName) => {
    const prevId = _getId(preName)

    const prevControls = removeItem(this._map.get(prevId) || [], control)

    if (!prevControls.length) this._map.delete(prevId)

    const currControls = this._map.get(control._id) || []

    // 避免重复
    if (currControls.includes(control)) return

    this._map.set(control._id, pushItem(currControls, control))
  }

  /**
   * @description 获取 isFormList = true 的指定字段
   */
  public getFormListControl = (listControl: FormListControl, name: InternalFieldName) => {
    return this._map.get(_getId(name))?.find((ctrl) => {
      const { isFormList } = ctrl._props

      return isFormList && isFormList.listControl === listControl
    })
  }
}

/**
 * @description 初始化逻辑
 */
export class FormInitialControl<S = any> {
  /**
   * @description Form 初始值
   */
  private _initialValues = {} as Partial<S>

  constructor(
    private $other: FormOtherControl,
    private $state: FormStateControl<S>,
    private $scheduler: FormSchedulerControl<S>,
    private $controls: FormControlsControl,
  ) {}

  /**
   * @description 回退至首次的视图状态
   */
  private fallbackViewState = (control: FormFieldControl) => {
    const displayValue = control.__holder!.viewState

    if (isUndefined(displayValue)) return

    const { _copied } = this.$scheduler

    this.$state.defineFieldValue(control._name, displayValue, _copied)
  }

  /**
   * @description 获取表单上对应的初始值
   */
  public getFormInitialValue = (name: InternalFieldName) => {
    return getIn(this._initialValues, name)
  }

  // /**
  //  * @description 获取字段最终的初始值
  //  */
  // public getFieldInitialValue = (control: FormFieldControl) => {
  //   const controls = this.$controls._map.get(control._id) || []

  //   return atIndex(controls, -1).__holder?.viewState
  // }

  /**
   * @description 获取字段最终的初始值 (TODO: 希望获得的是初次渲染时的字段值)
   */
  public getFieldInitialValue = (control: FormFieldControl) => {
    const formInitial = this.getFormInitialValue(control._name)

    if (!isUndefined(formInitial)) return formInitial

    function recursive($controls: FormControlsControl, _id: string): any {
      let fieldInitial: any

      const controls = $controls._map.get(_id) || []

      for (let len = controls.length, i = 0; i < len; i++) {
        const { _name, _props: { initialValue, isListField } } = controls[i]

        if (isUndefined(fieldInitial) && !isUndefined(initialValue)) {
          fieldInitial = initialValue
        }

        if (!isListField) continue

        const { listName, listId, listControl } = isListField

        const { initialValue: listInitial } = listControl._props

        // 尝试获取父级 Form.List 的初始值
        const topListInitial = recursive($controls, listId)

        const finallyInitial = fallback(topListInitial, listInitial)

        if (isUndefined(finallyInitial)) continue

        const itemName = _name.slice(listName.length)

        const itemInitial = getIn(finallyInitial, itemName)

        if (!isUndefined(itemInitial)) return itemInitial
      }

      return fieldInitial
    }

    return recursive(this.$controls, control._id)
  }

  /**
   * @description 合并 Form 初始值
   */
  public mergeInitialValues = (initialValues: Partial<S> | undefined) => {
    this._initialValues = { ...initialValues }

    // 初始值不能覆盖当前值
    this.$state.mergeFieldsValue(this._initialValues, this.$state._state)
  }

  /**
   * @description 设置字段初始值 (同时返回当前字段值)
   */
  public defineInitialValue = (control: FormFieldControl) => {
    const { $state, $scheduler } = this
    const { _name, _props: { initialValue } } = control

    // 初始化快照
    $scheduler._snapshots ??= $state._state

    if (!control._id) return

    const currentValue = $state.getFieldValue(_name)

    const displayValue = fallback(currentValue, initialValue)

    if (isUndefined(displayValue)) return

    const { _copied, _initial } = $scheduler

    _initial.defined.add(control)

    $state.defineFieldValue(_name, displayValue, _copied)

    return displayValue
  }

  /**
   * @description 确保字段已经初始化
   */
  public ensureInitialValue = (control: FormFieldControl) => {
    const { $state, $controls } = this

    const { initialValue, isListField } = control._props

    // 修复 strict mode 下的问题
    if (control.__holder) return this.fallbackViewState(control)

    // name 不合法 || 字段没有初始值
    if (!control._id || isUndefined(initialValue)) return

    // Form 上有初始值
    if (!isListField && !isUndefined(this.getFormInitialValue(control._name))) {
      if (process.env.NODE_ENV !== 'production') {
        logger.error(
          'InternalForm.[Field | List]',
          `Form already set 'initialValues' with path '${control._name.join('.')}', Field can not overwrite it`,
        )
      }

      return
    }

    // 有多个初始值
    if ($controls.hasDuplicateInitializedControls(control)) {
      if (process.env.NODE_ENV !== 'production') {
        logger.error(
          'InternalForm.[Field | List]',
          `Multiple Field with path '${control._name.join('.')}' set 'initialValue'. Can not decide which one to pick.`,
        )
      }

      return
    }

    // 已经有值了
    if (!isUndefined($state.getFieldValue(control._name))) return

    const { _copied } = this.$scheduler

    // 设置初始值 (此处只设置 props.initialValue 即可)
    $state.defineFieldValue(control._name, initialValue, _copied)
  }

  /**
   * @description 清除字段初始值
   */
  public cleanInitialValue = (control: FormFieldControl) => {
    const { $controls, $state, $other } = this
    const { _id, _name, __keepValue, _props } = control
    const { isFormList, isListField } = _props

    // Form.List 即将卸载，需要更新子字段的 behavior
    if (isFormList) this.$controls.updateListFieldBehavior(control)

    // name 不合法 || 需要保留数据
    if (!_id || $other.isKeepFieldValue(control)) return

    // 存在同名字段未被卸载
    if ($controls._map.has(_id)) return

    // simple 字段 由 Form.List 直接管理
    if (isListField && isListField.type === 'simple') return

    // 已经标记为需要保留的字段
    if (isListField && __keepValue) return

    // Form.List 还没有卸载，直接删除复杂字段的值
    const initialValue = isListField && !__keepValue
      ? undefined
      // 字段已卸载，重置为 Form 上的初始值
      : this.getFormInitialValue(_name)

    const isNonInitial = !isUndefined(initialValue)

    const isValueEqual = initialValue === $state.getFieldValue(_name)

    // 初始值不为空 && 与当前值相等
    if (isNonInitial && isValueEqual) return

    const { _copied } = this.$scheduler

    // 回退至初始值
    if (isNonInitial) return $state.defineFieldValue(_name, initialValue, _copied)

    // 需要删除字段值, 包含额外创建的对象
    for (let i = _name.length; i > 0; i--) {
      const parent = _name.slice(0, i)

      if ($controls._map.get(_getId(parent))) return

      $state.deleteFieldValue(parent, _copied)
    }
  }

  /**
   * @description 重置为字段默认值
   */
  public resetInitialValue = (resets: Map<string, FormFieldControl[]>, nameList?: ExternalFieldName[]) => {
    const prev = this.$state._state

    const copied = Object.create(null)

    const hasNameList = !isUndefined(nameList)

    if (!hasNameList) this.$state.mergeFieldsValue({}, this._initialValues)

    resets.forEach((controls, _id) => {
      if (!_id || !controls.length) return

      const { _name } = controls[0]

      // 阻止对父级字段的多次更新 (模拟字段初始化时的逻辑)
      if (hasIn(copied, _name, true)) return

      const fieldCurrent = this.$state.getFieldValue(_name)

      const fieldInitial = this.getFieldInitialValue(controls[0])

      const hasChanged = fieldCurrent !== fieldInitial

      const isNonInitial = !isUndefined(fieldInitial)

      if (!isNonInitial && hasNameList) {
        this.$state.deleteFieldValue(_name, copied)
      }
      else if (isNonInitial && hasChanged) {
        this.$state.defineFieldValue(_name, fieldInitial, copied)
      }
    })

    return [prev, this.$state._state, copied] as const
  }
}

/**
 * @description 调度逻辑
 */
export class FormDispatchControl<S = any> {
  /**
   * @description 最后一次校验的 promise
   */
  private _lastValidate: Promise<S> | null = null

  /**
   * @description 同步外部的字段信息
   */
  private _fields: ExternalFieldInfo[] | undefined

  constructor(
    private $other: FormOtherControl,
    private $state: FormStateControl<S>,
    private $scheduler: FormSchedulerControl<S>,
    private $controls: FormControlsControl,
    private $initial: FormInitialControl<S>,
  ) {}

  /**
   * @description 触发字段 dependencies 逻辑
   */
  private triggerDependencies = (controls: FormFieldControl[]) => {
    if (!controls.length) return []

    const dependencies = new Set<FormFieldControl>()

    this.$other.collectFieldGraph(controls, dependencies)

    // 相关字段触发一次更新
    dependencies.forEach((ctrl) => { ctrl.forceUpdate() })

    const updateControls = Array.from(dependencies)

    const nameList = updateControls.map(ctrl => ctrl._name)

    if (nameList.length) this.validateFields(nameList)

    return updateControls
  }

  /**
   * @description 更新字段
   */
  private updateControl = (predicate: (control: FormFieldControl) => unknown, defaults?: FormFieldControl[]) => {
    let controls: FormFieldControl[] = []

    if (this.$other.isFunctional() && !defaults) this.$other.forceUpdate()
    else controls = (defaults || this.$controls._list).filter(predicate)

    controls.forEach((control) => { control.forceUpdate() })

    return controls
  }

  /**
   * @description 调度更新
   */
  private scheduleUpdate = () => {
    // this.$scheduler.schedule('xxx', 0, () => {
    //   // 字段的初始值是会根据当前字段变化的。
    //   // 所以需要在字段添加/卸载时 如果还存在同名字段，则将初始值计算出来。
    // })

    this.$scheduler.schedule('update', 1, (tasks) => {
      const { _snapshots: prev, _initial, _cleanup, _events } = this.$scheduler
      const { _state: next } = this.$state

      const hasInitial = _initial.defined.size > 0
      const hasUpdated = _events.updated.size > 0

      const controls = this.updateControl((ctrl) => {
        // 初始化时该字段数值已设置
        if (hasInitial && _initial.defined.has(ctrl)) return false

        // 触发事件时该字段已被更新
        if (hasUpdated && _events.updated.has(ctrl)) return false

        return ctrl.shouldUpdate(prev, next)
      })

      // 优先级高且包含 cleanup 后续的逻辑了
      if (tasks.events) _events.controls = controls
      else if (tasks.cleanup) _cleanup.controls = controls
    })
  }

  /**
   * @description 字段调度方法
   */
  public dispatch = (action: DispatchAction) => {
    const { $other, $state, $scheduler, $controls, $initial } = this
    const { _initial, _cleanup, _events } = $scheduler

    switch (action.type) {
      // 字段注册
      case 'fieldInitial':{
        const { control, transient } = action

        // 初始化快照
        $scheduler._snapshots ??= $state._state

        $initial.ensureInitialValue(control)

        const current = control.markIsMounted($state)

        // 与视图不一致 && 不是 Form.List 时不能跳过更新
        transient !== current
        && !control._props.isFormList
        && _initial.defined.delete(control)

        this.scheduleUpdate()

        $scheduler.schedule('publish', 3, () => { $other.publishWatch(this, $scheduler) })

        break
      }
      // 字段卸载
      case 'fieldCleanup':{
        const { control } = action

        // 初始化快照
        $scheduler._snapshots ??= $state._state

        $initial.cleanInitialValue(control)

        control.markIsUnmounted()

        this.scheduleUpdate()

        $scheduler.schedule('cleanup', 2, () => { this.triggerDependencies(_cleanup.controls) })

        $scheduler.schedule('publish', 3, () => { $other.publishWatch(this, $scheduler) })

        break
      }
      // 触发事件
      case 'fieldEvent':{
        const { value, control } = action

        // 初始化快照
        $scheduler._snapshots ??= $state._state

        const [prev, next] = $state.defineFieldValue(control._name, value, Object.create(null))

        // 同名字段优先更新
        this
          .updateControl(ctrl => ctrl.shouldUpdate(prev, next), $controls._map.get(control._id))
          .forEach((ctrl) => { _events.updated.add(ctrl) })

        control.updateMetaInfoByFieldEvent()

        this.scheduleUpdate()

        $scheduler.schedule('events', 2, () => {
          _events.controls.forEach((ctrl) => { _events.updated.add(ctrl) })

          const controls = Array.from(_events.updated)

          const dependencies = this.triggerDependencies(controls)

          this.triggerOnValuesChange(controls, _events)

          this.triggerOnFieldsChange(controls.concat(dependencies))
        })

        $scheduler.schedule('publish', 3, () => { $other.publishWatch(this, $scheduler) })

        break
      }
      // 字段重置
      case 'resetFields':{
        const { nameList } = action

        const resets = $controls.getControlsForResetFields(nameList)

        const [prev, next, copied] = $initial.resetInitialValue(resets, nameList)

        this.updateControl(ctrl => !resets.has(ctrl._id) && ctrl.shouldUpdate(prev, next, copied))

        $controls.updateMetaInfoByResetFields(resets)

        $scheduler.schedule('publish', 3, () => { $other.publishWatch(this, $scheduler) })

        break
      }
      // 调用 setFieldsValue
      case 'setFieldsValue':{
        const { values } = action

        const [prev, next] = $state.mergeFieldsValue($state._state, values)

        this.updateControl(ctrl => ctrl.shouldUpdate(prev, next))

        $controls.updateMetaInfoByFieldsValue(prev, next)

        $scheduler.schedule('publish', 3, () => { $other.publishWatch(this, $scheduler) })

        break
      }
      // 调用 setFieldsInfo
      case 'setFieldsInfo':{
        const { fields } = action

        const [prev, next, copied] = $state.setFieldsInfo(fields)

        this.updateControl(ctrl => ctrl.shouldUpdate(prev, next, copied))

        $controls.updateMetaInfoByFieldsInfo(fields)

        $scheduler.schedule('publish', 3, () => { $other.publishWatch(this, $scheduler) })

        break
      }
      default: {
        throw new Error(`unknown action\n ${JSON.stringify(action, null, 2)}`)
      }
    }
  }

  /**
   * @description 注册字段 & 建立依赖图
   */
  public registerField = (control: FormFieldControl, transient: any) => {
    const cleanup1 = this.$controls.registerControl(control, this.$initial)

    const cleanup2 = this.$other.buildFieldGraph(control)

    this.dispatch({ type: 'fieldInitial', control, transient })

    return () => {
      cleanup1()

      cleanup2()

      this.dispatch({ type: 'fieldCleanup', control })
    }
  }

  public getFieldValue = (name: ExternalFieldName) => {
    return this.$state.getFieldValue(toArray(name))
  }

  /**
   * @description 获取一组路径的数据
   */
  public getFieldsValue: GetFieldsValueFunction<S> = (arg1: any, arg2?: any) => {
    const [nameList, compare] = normalizeGetFieldsValueOptions(arg1, arg2)

    const current = this.$state._state

    if (nameList === true && !compare) return current

    const copied = Object.create(null)

    return this
      .$controls
      .getControlsForGetFieldsValue(isArray(nameList) ? nameList : undefined)
      .reduce((values, ctrl) => {
        const { isFormList } = ctrl._props

        // Form.List 最新数据此时已存在于 values 中
        let value = getIn(isFormList ? values : current, ctrl._name)

        if (isFormList) value = toArray(value, true)

        // 自定义过滤条件
        if (compare && !compare(ctrl.getMetaInfo())) return values

        return defineIn(values, ctrl._name, value, copied)
      }, {} as S)
  }

  /**
   * @description 获取一组字段信息
   */
  public getFieldsInfo = (nameList?: ExternalFieldName[]) => {
    return this
      .$controls
      .getControlsForGetFieldsInfo(nameList)
      .map(ctrl => ctrl.getFieldInfo(this.$state))
  }

  /**
   * @description 设置字段值
   */
  public setFieldValue = (name: ExternalFieldName, value: any) => {
    this.dispatch({
      type: 'setFieldsInfo',
      fields: [{ name, value, warnings: [], errors: [], touched: true }],
    })
  }

  /**
   * @description 设置多个字段值
   */
  public setFieldsValue = (values: Record<string, any>) => {
    this.dispatch({ type: 'setFieldsValue', values })
  }

  /**
   * @description 设置一组字段状态
   */
  public setFieldsInfo = (fields: ExternalFieldInfo[]) => {
    this.dispatch({ type: 'setFieldsInfo', fields })
  }

  /**
   * @description 重置字段
   */
  public resetFields = (nameList?: ExternalFieldName[]) => {
    this.dispatch({ type: 'resetFields', nameList })
  }

  /**
   * @description 保存内部 fieldsInfo
   */
  public saveInternalFields = (fields?: ExternalFieldInfo[]) => {
    // TODO: 排除某些影响判断的数据类型
    if (!isEqual(this._fields || [], fields || [])) {
      this.setFieldsInfo(fields || [])
    }

    this._fields = fields
  }

  /**
   * @description 设置 Form 各种初始值
   */
  public defineFormInitials = (initialValues?: S, fields?: ExternalFieldInfo[]) => {
    // 初始化内部 fieldsInfo
    this._fields = fields

    this.$initial.mergeInitialValues(initialValues)
  }

  /**
   * @description 触发 onFieldsChange 回调 TODO: 待优化
   */
  private triggerOnFieldsChange = (controls: FormFieldControl[]) => {
    const { _provider: provider, _omitted: { name, onFieldsChange } } = this.$other

    if (!onFieldsChange && (!provider || isUndefined(name))) return

    const nameList = controls.map(ctrl => ctrl._name)

    const changedFields = this.getFieldsInfo(nameList)

    !isUndefined(name) && provider?.triggerFormChange(name, changedFields)

    onFieldsChange?.(changedFields, () => this.getFieldsInfo())
  }

  /**
   * @description 触发 onValuesChange 回调 (只有 fieldEvent 时才会触发)
   */
  private triggerOnValuesChange = (controls: FormFieldControl[], events: { values?: object }) => {
    const { onValuesChange } = this.$other._omitted

    if (!onValuesChange) return

    const copied = Object.create(null)

    events.values = this.getFieldsValue()

    const changedValues = controls.reduce((changed, ctrl) => {
      const fieldValue = getIn(events.values, ctrl._name)

      return defineIn(changed, ctrl._name, fieldValue, copied)
    }, {})

    onValuesChange(changedValues, events.values)
  }

  /**
   * @description 校验指定字段
   */
  public validateField = (name: ExternalFieldName) => {
    this.validateFields([name])
  }

  /**
   * @description 校验一组字段
   */
  public validateFields = (nameList?: ExternalFieldName[]) => {
    const { $state, $controls } = this

    // 获取所有准备校验的字段
    const controls = $controls.getControlsForValidateFields(nameList)

    const promises = controls.map(ctrl => ctrl.validate($state))

    const lastValidate = Promise.allSettled(promises)
      .then(results => FieldsValidateError.from(results))
      .then<S>((error) => {
        this.triggerOnFieldsChange(controls)

        const hasErrors = error instanceof FieldsValidateError

        const isExpired = lastValidate !== this._lastValidate

        // TODO: 后续添加 recursive 校验规则，这里不能直接使用 nameList
        const values = this.getFieldsValue(nameList)

        if (!isExpired && !hasErrors) return values

        throw new FormValidateError({ error, values, isExpired })
      })

    // 控制台不展示错误信息
    lastValidate.catch(noop)

    this._lastValidate = lastValidate

    this.triggerOnFieldsChange(controls)

    return lastValidate
  }

  /**
   * @description 触发 onFinish 回调
   */
  private triggerOnFinish = (values: S) => {
    const { _provider: provider, _omitted: { name, onFinish } } = this.$other

    if (!onFinish && !provider) return

    !isUndefined(name) && provider?.triggerFormFinish(name, values)

    // onFinish 不能抛出异常给 triggerOnFailed
    try { onFinish?.(values) }
    catch (e) { logger.error('InternalForm', 'an error because of `onFinish`', e) }
  }

  /**
   * @description 触发 onFailed 回调
   */
  private triggerOnFailed = (error: FormValidateError<S>) => {
    const { onFailed } = this.$other._omitted

    if (!onFailed) return

    onFailed(error.toJSON())
  }

  /**
   * @description 提交表单
   */
  public submitForm = () => {
    this.validateFields().then(this.triggerOnFinish, this.triggerOnFailed)
  }
}
