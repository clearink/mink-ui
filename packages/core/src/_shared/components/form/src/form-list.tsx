import type { InternalFormListContextState } from './_shared.context'
import type { InternalFormListProps } from './form-list.props'

import isEqual from 'react-fast-compare'
import { useMemo } from 'react'
import { toArray } from '@mink-ui/shared/array/to-array'
import { isArray } from '@mink-ui/shared/is/is-array'
import { isFunction } from '@mink-ui/shared/is/is-function'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'
import { rawType } from '@mink-ui/shared/object/raw-type'

import { useComputed } from '../../../hooks/use-computed'
import { useConstant } from '../../../hooks/use-constant'
import { useInvoke } from '../../../hooks/use-invoke'
import { defineName } from '../../../utils/define-name'
import { logger } from '../../../utils/logger'
import { InternalFormInstanceContext, InternalFormListContext } from './_shared.context'
import { List } from './form-field'
import { FormListControl } from './utils/list-control'
import { _getId, getIn } from './utils/path'

function InternalFormList(props: InternalFormListProps) {
  const formInstance = InternalFormInstanceContext.use()
  const topListContext = InternalFormListContext.use()

  const { children, name, rule, initialValue, isListField } = props

  const listName = useComputed({
    deps: [topListContext?.listName, toArray(name), isListField],
    compare: isEqual,
    factory: () => toArray(isListField === false ? null : topListContext?.listName).concat(toArray(name)),
  })

  const [listControl, listHelpers] = useConstant(() => FormListControl.inject())

  useInvoke(() => { listControl.updateInternals(props, formInstance, listName) })

  const listContextValue = useMemo<InternalFormListContextState>(() => {
    return { listControl, listName, listId: _getId(listName) }
  }, [listControl, listName])

  if (toArray(name).length === 0) {
    if (process.env.NODE_ENV !== 'production') {
      logger.error('InternalForm.List', 'name is required.')
    }
    return null
  }

  if (!isFunction(children)) {
    if (process.env.NODE_ENV !== 'production') {
      logger.error('InternalForm.List', 'children must be a function.')
    }
    return null
  }

  return (
    <List
      initialValue={initialValue}
      isListField={isListField}
      listControl={listControl}
      name={name}
      rule={rule}
      shouldUpdate={(prev, next) => {
        const prevList = getIn(prev, listName)
        const nextList = getIn(next, listName)

        if (rawType(prevList) !== rawType(nextList)) return true

        return isArray(nextList) && prevList.length !== nextList.length
      }}
    >
      {({ value }, metaInfo) => {
        if (process.env.NODE_ENV !== 'production') {
          if (!isArray(value) && !isUndefined(value)) {
            logger.error('InternalForm.List', `value of '${listName.join(' > ')}' is not an array type.`)
          }
        }

        const fields = toArray(value, true).map((_, i) => ({
          key: listControl.getKeyFromIndex(i),
          name: i,
        }))

        return (
          <InternalFormListContext value={listContextValue}>
            {children(fields, listHelpers, metaInfo)}
          </InternalFormListContext>
        )
      }}
    </List>
  )
}

defineName(InternalFormList, 'InternalForm.List')

export default InternalFormList
