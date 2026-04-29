import type { PortalProps } from './portal.props'

import { useCallback, useEffect, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
import { ownerBody } from '@mink-ui/shared/dom/global'
import { isNullish } from '@mink-ui/shared/is/is-nullish'

import { useExactState } from '../../../hooks/use-exact-state'
import { defineName } from '../../../utils/define-name'
import { findContainerElement } from '../../../utils/element'

function Portal(props: PortalProps) {
  const { ref, children, getContainer: _get } = props

  const getContainer = useCallback(() => findContainerElement(_get, ownerBody()), [_get])

  const [container, update] = useExactState(getContainer)

  useImperativeHandle(ref, () => container as any, [container])

  useEffect(() => { update(getContainer) }, [getContainer, update])

  if (isNullish(container)) return null

  if (container === false) return children

  return createPortal(children, container)
}

defineName(Portal)

export default Portal
