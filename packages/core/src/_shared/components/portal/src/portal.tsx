import type { PortalProps } from './portal.props'

import { useCallback, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom'
import { ownerBody } from '@mink-ui/shared/dom/global'
import { isNullish } from '@mink-ui/shared/is/is-nullish'

import { useIsomorphicEffect } from '../../../hooks/use-isomorphic-effect'
import { defineName } from '../../../utils/define-name'
import { findContainerElement } from '../../../utils/element'

function Portal(props: PortalProps) {
  const { ref, children, getContainer } = props

  const callback = useCallback(() => findContainerElement(getContainer, ownerBody()), [getContainer])

  const [container, update] = useState(callback)

  useImperativeHandle(ref, () => container as any, [container])

  useIsomorphicEffect(() => { update(callback) }, [callback])

  if (isNullish(container)) return null

  if (container === false) return children

  return createPortal(children, container)
}

defineName(Portal)

export default Portal
