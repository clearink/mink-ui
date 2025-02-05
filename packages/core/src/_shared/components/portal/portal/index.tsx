import type { ForwardedRef } from 'react'

import { useExactState } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName, getTargetElement } from '@mink-ui/core/_shared/utils'
import { isNullish, ownerBody } from '@mink-ui/shared'
import { forwardRef, useEffect, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'

import type { PortalProps, PortalRef } from './props'

function Portal(props: PortalProps, ref: ForwardedRef<PortalRef>) {
  const { children, getContainer: _container } = props

  const [container, set] = useExactState(() => getTargetElement(_container, ownerBody()))

  useImperativeHandle<PortalRef, PortalRef>(ref, () => container, [container])

  useEffect(() => { set(getTargetElement(_container, ownerBody())) }, [_container, set])

  if (isNullish(container)) return null

  if (container === false) return <>{children}</>

  return createPortal(children, container)
}

betterDisplayName(Portal)

export default forwardRef(Portal)
