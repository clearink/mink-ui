import { useConstant, useDeepMemo, useWatchValue } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName, withDefaults } from '@mink-ui/core/_shared/utils'
import { isUndefined, toArray } from '@mink-ui/shared'
import { Fragment, useEffect, useMemo } from 'react'

import type { ExternalFormFieldProps, InternalFormFieldProps } from './props'

import { InternalFormInstanceContext } from '../_shared.context'
import { HOOK_MARK } from '../form/control'
import { _getName } from '../utils/path'
import useFieldControl from './hooks/use-field-control'
import useInjectField from './hooks/use-inject-field'
import { defaultInternalFormFieldProps } from './props'

function _InternalFormField(_props: InternalFormFieldProps) {
  const props = withDefaults(_props, defaultInternalFormFieldProps)

  const { rule, dependencies } = props

  // 父级表单方法
  const instance = InternalFormInstanceContext.useState()

  const internalHooks = useMemo(() => instance.getInternalHooks(HOOK_MARK)!, [instance])

  const [control, resetCount] = useFieldControl()

  useMemo(() => { control.setInternalFieldProps(props) }, [control, props])

  // 设置初始值,减少一次 re-render
  useConstant(() => { internalHooks.ensureInitialized(control) })

  // 注册子字段 销毁时移除该字段
  useEffect(() => internalHooks.registerField(control), [control, internalHooks])

  // 监听依赖字段, 当依赖字段变更时，会执行 control 自身的校验函数
  // 当 dependencies 改变时，重新订阅
  // name 属性变化会直接重新mount，在此处不用考虑
  const key = useDeepMemo(() => dependencies, [dependencies])
  useEffect(() => internalHooks.subscribe(control), [control, internalHooks, key])

  // rule 变为空时清除当前的错误信息
  const returnEarly = useWatchValue(rule, (curr, prev) => {
    if (!curr && prev) control.metaUpdate({ errors: [], warnings: [] })
  })

  // 数据注入
  const children = useInjectField(props, instance, control, internalHooks)

  return returnEarly ? null : <Fragment key={resetCount}>{children}</Fragment>
}

function InternalFormField(props: ExternalFormFieldProps) {
  const { isListField, name } = props

  const { listPath = [] } = InternalFormInstanceContext.useState()

  const path = isUndefined(name) ? [] : listPath.concat(toArray(name))

  const key = isListField ? 'keep' : _getName(path)

  return <_InternalFormField key={key} {...props} name={path} />
}

betterDisplayName(InternalFormField, 'InternalForm.Field')

export default InternalFormField
