import { isArray, isFunction, isUndefined, rawType, toArray } from '@mink-ui/shared'
import { useMemo } from 'react'

import type { InternalFormListProps } from './props'

import { useConstant, useDeepMemo } from '../../../../_shared/hooks'
import { betterDisplayName, logger } from '../../../../_shared/utils'
import { InternalFormInstanceContext, InternalFormListContext } from '../_shared.context'
import InternalFormField from '../field'
import { _getId } from '../utils/path'
import { getIn } from '../utils/value'
import FormListControl from './control'

function InternalFormList(props: InternalFormListProps) {
  const { children, initialValue, name, rule } = props

  const instance = InternalFormInstanceContext.useState()

  const parentContext = InternalFormListContext.useState()

  const listPath = useDeepMemo(() => {
    if (!parentContext?.listPath) return toArray(name)

    return parentContext.listPath.concat(toArray(name))
  }, [parentContext?.listPath, name])

  const listControl = useConstant(() => new FormListControl())

  useMemo(() => {
    listControl.setInternalListProps(props, instance, listPath)
  }, [listControl, props, instance, listPath])

  const listContext = useMemo(() => ({ listPath, listControl }), [listPath, listControl])

  const helpers = useMemo(() => listControl.getFeatures(), [listControl])

  //  name 无效 || children 不是函数
  const invalidChildren = !isFunction(children) || !_getId(name)

  if (process.env.NODE_ENV !== 'production') {
    logger(!_getId(name), 'Form.List Miss `name` prop.')
    logger(!isFunction(children), 'Form.List only accepts function as children.')
  }

  if (invalidChildren) return null

  return (
    <InternalFormField
      initialValue={initialValue}
      name={name}
      rule={rule}
      isFormList
      shouldUpdate={(prev, next) => {
        const path = toArray(name)

        const prevList = getIn(prev, path)

        const nextList = getIn(next, path)

        // Form.List 简单判断是否需要更新自身, 避免重复渲染
        // TODO: 后续跟进验证分析
        if (rawType(prevList) !== rawType(nextList)) return true

        return isArray(nextList) && prevList.length !== nextList.length
      }}
    >
      {({ value }: any, meta) => {
        if (process.env.NODE_ENV !== 'production') {
          logger(!isArray(value) && !isUndefined(value), `value of '${listPath.join(' > ')}' is not an array type.`)
        }

        const fields = toArray(value, true).map((_, index) => ({
          key: listControl.ensureFieldKey(index),
          name: index,
        }))

        return (
          <InternalFormListContext.Provider value={listContext}>
            {children(fields, helpers, meta)}
          </InternalFormListContext.Provider>
        )
      }}
    </InternalFormField>
  )
}

betterDisplayName(InternalFormList, 'InternalForm.List')

export default InternalFormList
