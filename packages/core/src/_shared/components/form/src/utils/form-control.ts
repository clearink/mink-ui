import type { VoidFn } from '@mink-ui/shared/interface'
import type { InternalFormProviderContextState, InternalFormSharedContextState } from '../_shared.context'
import type {
  ExternalFieldInfo,
  ExternalFieldName,
  FormDispatchAction,
  FormScheduleFunction,
  FormScheduleTasks,
  GetFieldsValueFunction,
  InternalFieldName,
  InternalFormInstance,
  InternalHooksReturn,
  IsFieldsTouchedFunction,
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
import { _getId, getIn, hasIn, hasLink, relation } from './path'
import { defineIn, deleteIn, linkIn, mergeIn, unlinkIn } from './value'

export class FormControl<S = any> {
  private $$other: FormOtherControl

  private $$state: FormStateControl

  private $$scheduler: FormSchedulerControl

  private $$controls: FormControlsControl

  private $$initial: FormInitialControl

  private $$dispatch: FormDispatchControl

  constructor(forceUpdate: VoidFn) {
    this.$$other = new FormOtherControl<S>(forceUpdate)

    this.$$state = new FormStateControl<S>()

    this.$$scheduler = new FormSchedulerControl<S>()

    this.$$controls = new FormControlsControl(this.$$other)

    this.$$initial = new FormInitialControl<S>(
      this.$$other,
      this.$$state,
      this.$$scheduler,
      this.$$controls,
    )

    this.$$dispatch = new FormDispatchControl<S>(
      this.$$other,
      this.$$state,
      this.$$scheduler,
      this.$$controls,
      this.$$initial,
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

    const { $$other, $$scheduler, $$controls, $$dispatch, $$initial } = this

    return {
      _bind: $$other._bind,
      dispatch: $$dispatch.dispatch,
      registerField: $$dispatch.registerField,
      registerWatch: $$other.registerWatch,
      registerScheduler: $$scheduler.registerScheduler,
      setFieldsInfo: $$dispatch.setFieldsInfo,
      defineInitialValue: $$initial.defineInitialValue,
      updateControlsMap: $$controls.updateControlsMap,
      updateFieldEdges: $$other.updateFieldEdges,
      defineFormInitials: $$dispatch.defineFormInitials,
      saveInternalFields: $$dispatch.saveInternalFields,
      getFormListControl: $$controls.getFormListControl,
    }
  }

  /**
   * @description 向外暴露方法
   */
  public expose = (): InternalFormInstance<S> => {
    const { $$controls, $$dispatch } = this

    return {
      /** @private */
      getInternalHooks: this.getInternalHooks,

      getFieldError: $$controls.getFieldError,
      getFieldsError: $$controls.getFieldsError,

      getFieldValue: $$dispatch.getFieldValue,
      getFieldsValue: $$dispatch.getFieldsValue,

      setFieldValue: $$dispatch.setFieldValue,
      setFieldsValue: $$dispatch.setFieldsValue,

      validateField: $$dispatch.validateField,
      validateFields: $$dispatch.validateFields,

      isFieldTouched: $$controls.isFieldTouched,
      isFieldsTouched: $$controls.isFieldsTouched,

      isFieldValidating: $$controls.isFieldValidating,
      isFieldsValidating: $$controls.isFieldsValidating,

      resetFields: $$dispatch.resetFields,

      submitForm: $$dispatch.submitForm,
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
  private _edges = new Map<string, Set<FormFieldControl>>()

  /**
   * @description useWatch 监听事件
   */
  private _watchers = new Set<WatchCallBack>()

  constructor(public forceUpdate: VoidFn) {}

  /**
   * @description 更新内部状态
   */
  public _bind = (
    picked: PickedInternalFormProps<S>,
    omitted: OmittedInternalFormProps<S>,
    provider: InternalFormProviderContextState | null,
    _shared: InternalFormSharedContextState | null,
  ) => {
    this._picked = picked
    this._omitted = omitted
    this._provider = provider

    // TODO: 需要定义一个字段专门存储以优化性能
    // const validateMessages = {
    //   ...shared?.validateMessages,
    //   ...omitted.validateMessages,
    // }
  }

  /**
   * @description 表单是否为 render props
   */
  public isFunctional = () => isFunction(this._omitted.children)

  /**
   * @description 是否保留字段值
   */
  public isKeepFieldValue = (ctrl: FormFieldControl) => {
    const { preserve: formLevel } = this._picked

    const { preserve: fieldLevel } = ctrl._props

    return fallback(fieldLevel, formLevel, true)!
  }

  /**
   * @description 收集依赖的字段
   */
  public collectFieldEdges = (controls: FormFieldControl[], set: Set<FormFieldControl>) => {
    if (!controls.length) return

    const next: FormFieldControl[] = []

    controls.forEach(({ _id }) => {
      const collection = this._edges.get(_id)

      collection && collection.forEach((ctrl) => {
        if (set.has(ctrl) || !ctrl.isDirty()) return

        set.add(ctrl)

        next.push(ctrl)
      })
    })

    this.collectFieldEdges(next, set)
  }

  /**
   * @description 建立依赖关系
   */
  public buildFieldEdges = (control: FormFieldControl) => {
    const { dependencies = [] } = control._props

    dependencies.forEach((name) => {
      const id = _getId(name)

      if (!id || id === control._id) return

      const set = this._edges.get(id) || new Set()

      this._edges.set(id, set.add(control))
    })

    return () => { this.cleanFieldEdges(control) }
  }

  /**
   * @description 清理依赖关系
   */
  public cleanFieldEdges = (control: FormFieldControl) => {
    this._edges.forEach((set, id) => {
      if (set.has(control)) set.delete(control)

      if (!set.size) this._edges.delete(id)
    })
  }

  /**
   * @description 更新依赖关系
   */
  public updateFieldEdges = (control: FormFieldControl) => {
    this.cleanFieldEdges(control)

    this.buildFieldEdges(control)
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
  public publishWatch = ($$dispatch: FormDispatchControl, $$scheduler: FormSchedulerControl) => {
    if (!this._watchers.size) return

    // 或许可以减少一次计算 (数据量大时提升明显)
    const values = $$scheduler._events?.values || $$dispatch.getFieldsValue()

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
  public deleteFieldValue = (name: InternalFieldName, links: object, copied: object) => {
    const prev = this._state

    const path = name.slice()

    do {
      this._state = deleteIn(this._state, path, copied)

      path.pop()
    } while (path.length && !hasLink(links, path))

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
  public _tasks: FormScheduleTasks = Object.create(null)

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
    linked: Object.create(null),
  }

  /**
   * @description 字段清除时额外的数据
   */
  public _cleanup = {
    controls: [] as FormFieldControl[],
    linked: Object.create(null),
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
  public schedule: FormScheduleFunction = (key, priority, factory) => {
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
      this._initial.linked = Object.create(null)

      this._cleanup.controls = []
      this._cleanup.linked = Object.create(null)

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

  public _links = Object.create(null)

  constructor(private $$other: FormOtherControl) {}

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

    const names = new Map(toArray(nameList, true).map(name => [_getId(name), name]))

    this._map.forEach((ctrls, _id) => {
      if (!_id || (names.size && !names.has(_id))) return

      const ctrl = ctrls.find(ctrl => ctrl._props.isFormList)

      ctrl ? array.set(_id, ctrl) : result.set(_id, ctrls[0])
    })

    // 还有未被添加的 name 使用 FakeFieldControl 占位
    names.size && names.forEach((_name, _id) => {
      if (!_id || result.has(_id) || array.has(_id)) return

      result.set(_id, new FakeFieldControl(_name))
    })

    // 提供 nameList && array 不为空时，收集剩余的 isListField 字段
    names.size && array.size && this._list.forEach((ctrl) => {
      const { isListField } = ctrl._props

      if (!ctrl._id || result.has(ctrl._id)) return

      if (!isListField || !array.has(isListField.listId)) return

      result.set(ctrl._id, ctrl)
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
   * @private
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
   * @private
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
   */
  public getControlsForResetFields = (nameList: ExternalFieldName[] | undefined) => {
    const result = new Map<string, FormFieldControl[]>()

    const array = new Map<string, FormFieldControl[]>()

    const names = new Set(toArray(nameList, true).map(name => _getId(name)))

    this._map.forEach((ctrls, _id) => {
      // 提供 nameList 时，根据 nameList 找到到对应的字段
      if (names.size && !names.has(_id)) return

      const hasFormList = ctrls.some(ctrl => ctrl._props.isFormList)

      hasFormList ? array.set(_id, ctrls) : result.set(_id, ctrls)
    })

    // array 不为空时，将 ListField 的 behavior 设置为 keep
    array.size && this._list.forEach((ctrl) => {
      const { isListField } = ctrl._props

      if (!isListField || !array.has(isListField.listId)) return

      ctrl.updateKeepValueBehavior(true)
    })

    // 将 array 中的字段追加到 result 中
    array.forEach((controls, key) => { result.set(key, controls) })

    return [result, names.size > 0] as const
  }

  /**
   * @description 获取 resetFields 所需要的 links
   */
  public getLinksForResetFields = (resets: Map<string, FormFieldControl[]>, hasNames: boolean) => {
    if (!hasNames) return Object.create(null)

    const copied = Object.create(null)

    return Array.from(resets.values()).reduce((result, ctrls) => {
      return unlinkIn(result, ctrls[0]._name, copied)
    }, this._links)
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
  public registerControl = (ctrl: FormFieldControl, $$initial: FormInitialControl) => {
    ctrl.setGetInitialValue(() => $$initial.getFieldInitialValue(ctrl))

    pushItem(this._list, ctrl)

    this._map.set(ctrl._id, pushItem(this._map.get(ctrl._id) || [], ctrl))

    return () => {
      removeItem(this._list, ctrl)

      const cache = removeItem(this._map.get(ctrl._id) || [], ctrl)

      if (!cache.length) this._map.delete(ctrl._id)
    }
  }

  /**
   * @description 创建字段名链接
   */
  public buildFieldLinks = (ctrl: FormFieldControl, $$scheduler: FormSchedulerControl) => {
    const controls = this._map.get(ctrl._id) || []

    if (!ctrl._id || controls.length > 1) return noop

    this._links = linkIn(this._links, ctrl._name, $$scheduler._initial.linked)

    return () => {
      if (this._map.has(ctrl._id)) return

      this._links = unlinkIn(this._links, ctrl._name, $$scheduler._cleanup.linked)
    }
  }

  /**
   * @description 更新 Form.List 子字段在卸载时的行为
   */
  public updateListFieldBehavior = (ctrl: FormFieldControl) => {
    const { isFormList } = ctrl._props

    // 如果 Form.List 自身需要保持数据，则其子字段也强制需要 (不用判断 preserve)
    const keepValue = ctrl.__keepValue || this.$$other.isKeepFieldValue(ctrl)

    isFormList && this._list.forEach((ctrl) => {
      const { isListField } = ctrl._props

      if (!isListField || isListField.listControl !== isFormList.listControl) return

      ctrl.updateKeepValueBehavior(keepValue)
    })
  }

  /**
   * @description 更新 map 关系
   */
  public updateControlsMap = (ctrl: FormFieldControl, preName: InternalFieldName) => {
    const prevId = _getId(preName)

    const prevControls = removeItem(this._map.get(prevId) || [], ctrl)

    if (!prevControls.length) this._map.delete(prevId)

    const currControls = this._map.get(ctrl._id) || []

    // 避免重复
    if (currControls.includes(ctrl)) return

    this._map.set(ctrl._id, pushItem(currControls, ctrl))
  }

  /**
   * @description 获取 isFormList 有值的字段
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
    private $$other: FormOtherControl,
    private $$state: FormStateControl<S>,
    private $$scheduler: FormSchedulerControl<S>,
    private $$controls: FormControlsControl,
  ) {}

  /**
   * @private
   * @description 回退至首次挂载时的状态
   */
  private fallbackHolderState = (ctrl: FormFieldControl) => {
    const { $$state, $$scheduler } = this

    const snapshot = ctrl.__holder!.current

    if (isUndefined(snapshot)) return

    $$state.defineFieldValue(ctrl._name, snapshot, $$scheduler._copied)
  }

  /**
   * @description 获取表单上对应的初始值
   */
  public getFormInitialValue = (name: InternalFieldName) => {
    return getIn(this._initialValues, name)
  }

  /**
   * @description 获取字段最终的初始值 (TODO: 希望获得的是初次渲染时的字段值)
   */
  public getFieldInitialValue = (control: FormFieldControl) => {
    const formInitial = this.getFormInitialValue(control._name)

    if (!isUndefined(formInitial)) return formInitial

    function recursive($$controls: FormControlsControl, _id: string): any {
      let fieldInitial: any

      const controls = $$controls._map.get(_id) || []

      for (let len = controls.length, i = 0; i < len; i++) {
        const { _name, _props: { initialValue, isListField } } = controls[i]

        if (isUndefined(fieldInitial) && !isUndefined(initialValue)) {
          fieldInitial = initialValue
        }

        if (!isListField) continue

        const { listName, listId, listControl } = isListField

        const { initialValue: listInitial } = listControl._props

        // 尝试获取父级 Form.List 的初始值
        const topListInitial = recursive($$controls, listId)

        const finallyInitial = fallback(topListInitial, listInitial)

        if (isUndefined(finallyInitial)) continue

        const itemName = _name.slice(listName.length)

        const itemInitial = getIn(finallyInitial, itemName)

        if (!isUndefined(itemInitial)) return itemInitial
      }

      return fieldInitial
    }

    return recursive(this.$$controls, control._id)
  }

  /**
   * @description 合并 Form 初始值
   */
  public mergeInitialValues = (initialValues: Partial<S> | undefined) => {
    this._initialValues = { ...initialValues }

    // 初始值不能覆盖当前值
    this.$$state.mergeFieldsValue(this._initialValues, this.$$state._state)
  }

  /**
   * @description 设置字段初始值 (同时返回当前字段值)
   */
  public defineInitialValue = (control: FormFieldControl) => {
    const { $$state, $$scheduler } = this
    const { _name, _props: { initialValue } } = control

    // 初始化快照
    $$scheduler._snapshots ??= $$state._state

    if (!control._id) return

    const currentValue = $$state.getFieldValue(_name)

    const hasCurrentVal = !isUndefined(currentValue)

    const hasInitialVal = !isUndefined(initialValue)

    // 有当前值 || 有初始值 => 跳过首次 shouldUpdate 判断
    if (hasCurrentVal || hasInitialVal) {
      $$scheduler._initial.defined.add(control)
    }

    // 无当前值 && 有初始值 => 设置初始值
    if (!hasCurrentVal && hasInitialVal) {
      $$state.defineFieldValue(_name, initialValue, $$scheduler._copied)
    }

    return hasCurrentVal ? currentValue : initialValue
  }

  /**
   * @description 确保字段已经初始化
   */
  public ensureInitialValue = (control: FormFieldControl) => {
    const { $$controls, $$state, $$scheduler } = this
    const { _id, _name, __holder, _props } = control
    const { initialValue, isListField } = _props

    // 修复 strict mode 下的问题
    if (__holder) return this.fallbackHolderState(control)

    // name 不合法 || 字段没有初始值
    if (!_id || isUndefined(initialValue)) return

    // Form 上有初始值
    if (!isListField && !isUndefined(this.getFormInitialValue(_name))) {
      if (process.env.NODE_ENV !== 'production') {
        logger.error(
          'InternalForm.[Field | List]',
          `Form already set 'initialValues' with path '${_name.join('.')}', Field can not overwrite it`,
        )
      }

      return
    }

    // 有多个初始值
    if ($$controls.hasDuplicateInitializedControls(control)) {
      if (process.env.NODE_ENV !== 'production') {
        logger.error(
          'InternalForm.[Field | List]',
          `Multiple Field with path '${_name.join('.')}' set 'initialValue'. Can not decide which one to pick.`,
        )
      }

      return
    }

    // 已经有值了
    if (!isUndefined($$state.getFieldValue(_name))) return

    // 设置初始值 (此处只设置 props.initialValue 即可)
    $$state.defineFieldValue(_name, initialValue, $$scheduler._copied)
  }

  /**
   * @description 清除字段初始值
   */
  public cleanInitialValue = (control: FormFieldControl) => {
    const { $$controls, $$state, $$other, $$scheduler } = this
    const { _id, _name, __keepValue, _props } = control
    const { isFormList, isListField } = _props

    // Form.List 即将卸载，需要更新子字段的 behavior
    if (isFormList) this.$$controls.updateListFieldBehavior(control)

    // name 不合法 || 存在同名字段未被卸载
    if (!_id || $$controls._map.has(_id)) return

    // 需要保留数据
    if ($$other.isKeepFieldValue(control)) return

    // 由 Form.List 管理
    if (isListField && (isListField.direct || __keepValue)) return

    // 无需保留字段值
    const asUndefined = isListField && !__keepValue

    const initialValue = asUndefined ? undefined : this.getFormInitialValue(_name)

    const hasInitialVal = !isUndefined(initialValue)

    const isValueEqual = initialValue === $$state.getFieldValue(_name)

    if (!hasInitialVal) $$state.deleteFieldValue(_name, $$controls._links, $$scheduler._copied)
    else if (!isValueEqual) $$state.defineFieldValue(_name, initialValue, $$scheduler._copied)
  }

  /**
   * @description 重置为字段默认值
   */
  public resetInitialValue = (resets: Map<string, FormFieldControl[]>, links: object, hasNames: boolean) => {
    const { $$state } = this

    const prev = $$state._state

    const copied = Object.create(null)

    if (!hasNames) $$state.mergeFieldsValue({}, this._initialValues)

    resets.forEach((ctrls, _id) => {
      // _id 不合法 || 由 Form.List 管理，跳过
      if (!_id || ctrls.some(ctrl => ctrl.__keepValue)) return

      const { _name } = ctrls[0]

      const hasFormList = ctrls.some(ctrl => ctrl._props.isFormList)

      if (!hasFormList && hasIn(copied, _name, true)) return

      const fieldInitial = this.getFieldInitialValue(ctrls[0])

      const fieldCurrent = $$state.getFieldValue(_name)

      const isValueEqual = fieldCurrent === fieldInitial

      const hasInitialVal = !isUndefined(fieldInitial)

      if (!hasInitialVal && hasNames) $$state.deleteFieldValue(_name, links, copied)
      else if (hasInitialVal && !isValueEqual) $$state.defineFieldValue(_name, fieldInitial, copied)
    })

    return [prev, $$state._state, copied] as const
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
    private $$other: FormOtherControl,
    private $$state: FormStateControl<S>,
    private $$scheduler: FormSchedulerControl<S>,
    private $$controls: FormControlsControl,
    private $$initial: FormInitialControl<S>,
  ) {}

  /**
   * @private
   * @description 触发字段 dependencies 逻辑
   */
  private triggerDependencies = (controls: FormFieldControl[]) => {
    if (!controls.length) return []

    const dependencies = new Set<FormFieldControl>()

    this.$$other.collectFieldEdges(controls, dependencies)

    // 相关字段触发一次更新
    dependencies.forEach((ctrl) => { ctrl.forceUpdate() })

    const updateControls = Array.from(dependencies)

    const nameList = updateControls.map(ctrl => ctrl._name)

    if (nameList.length) this.validateFields(nameList)

    return updateControls
  }

  /**
   * @private
   * @description 更新字段
   */
  private updateControl = (predicate: (control: FormFieldControl) => unknown, defaults?: FormFieldControl[]) => {
    let controls: FormFieldControl[] = []

    if (this.$$other.isFunctional() && !defaults) this.$$other.forceUpdate()
    else controls = (defaults || this.$$controls._list).filter(predicate)

    controls.forEach((control) => { control.forceUpdate() })

    return controls
  }

  /**
   * @private
   * @description 调度更新
   */
  private scheduleUpdate = () => {
    this.$$scheduler.schedule('update', 1, (tasks) => {
      const { _snapshots: prev, _initial, _cleanup, _events } = this.$$scheduler
      const { _state: next } = this.$$state

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
  public dispatch = (action: FormDispatchAction) => {
    const { $$other, $$state, $$scheduler, $$controls, $$initial } = this
    const { _initial, _cleanup, _events } = $$scheduler

    switch (action.type) {
      // 字段注册
      case 'fieldInitial': {
        const { control, transient } = action

        // 初始化快照
        $$scheduler._snapshots ??= $$state._state

        $$initial.ensureInitialValue(control)

        const asUndefined = control.markIsMounted($$state, transient)

        // 不能跳过更新 (与视图不一致 && 不是 Form.List)
        asUndefined && _initial.defined.delete(control)

        this.scheduleUpdate()

        $$scheduler.schedule('publish', 3, () => { $$other.publishWatch(this, $$scheduler) })

        break
      }
      // 字段卸载
      case 'fieldCleanup': {
        const { control } = action

        // 初始化快照
        $$scheduler._snapshots ??= $$state._state

        $$initial.cleanInitialValue(control)

        control.markIsUnmounted()

        this.scheduleUpdate()

        $$scheduler.schedule('cleanup', 2, () => { this.triggerDependencies(_cleanup.controls) })

        $$scheduler.schedule('publish', 3, () => { $$other.publishWatch(this, $$scheduler) })

        break
      }
      // 触发事件
      case 'fieldEvent': {
        const { value, control } = action

        // 初始化快照
        $$scheduler._snapshots ??= $$state._state

        const [prev, next] = $$state.defineFieldValue(control._name, value, Object.create(null))

        // 同名字段优先更新
        this
          .updateControl(ctrl => ctrl.shouldUpdate(prev, next), $$controls._map.get(control._id))
          .forEach((ctrl) => { _events.updated.add(ctrl) })

        control.updateMetaInfoByFieldEvent()

        this.scheduleUpdate()

        $$scheduler.schedule('events', 2, () => {
          _events.controls.forEach((ctrl) => { _events.updated.add(ctrl) })

          const controls = Array.from(_events.updated)

          const dependencies = this.triggerDependencies(controls)

          this.triggerOnValuesChange(controls, _events)

          this.triggerOnFieldsChange(controls.concat(dependencies))
        })

        $$scheduler.schedule('publish', 3, () => { $$other.publishWatch(this, $$scheduler) })

        break
      }
      // 字段重置
      case 'resetFields': {
        const { nameList } = action

        const [resets, hasNames] = $$controls.getControlsForResetFields(nameList)

        const links = $$controls.getLinksForResetFields(resets, hasNames)

        const [prev, next, copied] = $$initial.resetInitialValue(resets, links, hasNames)

        this.updateControl(ctrl => !resets.has(ctrl._id) && ctrl.shouldUpdate(prev, next, copied))

        $$controls.updateMetaInfoByResetFields(resets)

        $$scheduler.schedule('publish', 3, () => { $$other.publishWatch(this, $$scheduler) })

        break
      }
      // 调用 setFieldsValue
      case 'setFieldsValue': {
        const { values } = action

        const [prev, next] = $$state.mergeFieldsValue($$state._state, values)

        this.updateControl(ctrl => ctrl.shouldUpdate(prev, next))

        $$controls.updateMetaInfoByFieldsValue(prev, next)

        $$scheduler.schedule('publish', 3, () => { $$other.publishWatch(this, $$scheduler) })

        break
      }
      // 调用 setFieldsInfo
      case 'setFieldsInfo': {
        const { fields } = action

        const [prev, next, copied] = $$state.setFieldsInfo(fields)

        this.updateControl(ctrl => ctrl.shouldUpdate(prev, next, copied))

        $$controls.updateMetaInfoByFieldsInfo(fields)

        $$scheduler.schedule('publish', 3, () => { $$other.publishWatch(this, $$scheduler) })

        break
      }
      // 未定义事件类型
      default: {
        throw new Error(`unknown action\n ${JSON.stringify(action, null, 2)}`)
      }
    }
  }

  /**
   * @description 注册字段 & 建立依赖图
   */
  public registerField = (control: FormFieldControl, transient: any) => {
    const cleanup1 = this.$$controls.registerControl(control, this.$$initial)

    const cleanup2 = this.$$controls.buildFieldLinks(control, this.$$scheduler)

    const cleanup3 = this.$$other.buildFieldEdges(control)

    this.dispatch({ type: 'fieldInitial', control, transient })

    return () => {
      cleanup1()

      cleanup2()

      cleanup3()

      this.dispatch({ type: 'fieldCleanup', control })
    }
  }

  public getFieldValue = (name: ExternalFieldName) => {
    return this.$$state.getFieldValue(toArray(name))
  }

  /**
   * @description 获取一组路径的数据
   */
  public getFieldsValue: GetFieldsValueFunction<S> = (arg1: any, arg2?: any) => {
    const [nameList, compare] = normalizeGetFieldsValueOptions(arg1, arg2)

    const current = this.$$state._state

    if (nameList === true && !compare) return current

    const copied = Object.create(null)

    return this
      .$$controls
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
      .$$controls
      .getControlsForGetFieldsInfo(nameList)
      .map(ctrl => ctrl.getFieldInfo(this.$$state))
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

    this.$$initial.mergeInitialValues(initialValues)
  }

  /**
   * @private
   * @description 触发 onFieldsChange 回调
   */
  private triggerOnFieldsChange = (controls: FormFieldControl[]) => {
    const { _provider: provider, _omitted: { name, onFieldsChange } } = this.$$other

    if (!onFieldsChange && (!provider || isUndefined(name))) return

    const nameList = controls.map(ctrl => ctrl._name)

    const changedFields = this.getFieldsInfo(nameList)

    !isUndefined(name) && provider?.triggerFormChange(name, changedFields)

    onFieldsChange?.(changedFields, () => this.getFieldsInfo())
  }

  /**
   * @private
   * @description 触发 onValuesChange 回调 (只有 fieldEvent 时才会触发)
   */
  private triggerOnValuesChange = (controls: FormFieldControl[], events: { values?: object }) => {
    const { onValuesChange } = this.$$other._omitted

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
    const { $$state, $$controls } = this

    // 获取所有准备校验的字段
    const controls = $$controls.getControlsForValidateFields(nameList)

    const promises = controls.map(ctrl => ctrl.validate($$state))

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
   * @private
   * @description 触发 onFinish 回调
   */
  private triggerOnFinish = (values: S) => {
    const { _provider: provider, _omitted: { name, onFinish } } = this.$$other

    if (!onFinish && !provider) return

    !isUndefined(name) && provider?.triggerFormFinish(name, values)

    // onFinish 不能抛出异常给 triggerOnFailed
    try { onFinish?.(values) }
    catch (e) { logger.error('InternalForm', 'an error because of `onFinish`', e) }
  }

  /**
   * @private
   * @description 触发 onFailed 回调
   */
  private triggerOnFailed = (error: FormValidateError<S>) => {
    const { onFailed } = this.$$other._omitted

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
