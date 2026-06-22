import type { PortalProps } from './portal.props'

import { useCallback, useEffect, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom'
import { ownerDocument } from '@mink-ui/shared/dom/global'
import { isNullish } from '@mink-ui/shared/is/is-nullish'

import { defineName } from '../../../utils/define-name'
import { findContainerElement } from '../../../utils/element'

function Portal(props: PortalProps) {
  const { ref, children, getContainer } = props

  const callback = useCallback(() => findContainerElement(getContainer, ownerDocument().body), [getContainer])

  const [container, setContainer] = useState(callback)

  useImperativeHandle(ref, () => container as any, [container])

  useEffect(() => { setContainer(callback) }, [callback])

  if (isNullish(container)) return null

  if (container === false) return children

  return createPortal(children, container)
}

defineName(Portal)

export default Portal
