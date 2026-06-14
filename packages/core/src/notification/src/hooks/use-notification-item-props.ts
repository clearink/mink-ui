import type { NotificationItemProps } from '../notification-item.props'

import { useState } from 'react'

import { useCombinedRefs } from '../../../_shared/hooks/use-combined-refs'
import { useEvent } from '../../../_shared/hooks/use-event'
import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { normalizeClosable } from '../../../_shared/utils/closable'
import { useNotificationItemClassNames } from './use-class-names'

export function useNotificationItemProps(props: NotificationItemProps) {
  const globalConfig = useConfiguration('notification')

  const {
    ref,
    item,
    getters,
    listHovering,
    outerCssNames,
    outerCssAttrs,
    outerCssVars,
    onCollect,
    onDismiss,
  } = props
  const { closable, onClose } = item

  const { ns, classNames } = useNotificationItemClassNames(props)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      outerCssNames,
      classNames,
      item.classNames,
      { root: item.className },
      { root: getters.names() },
    ],
    [
      outerCssAttrs,
      item.styles,
      { root: item.style },
      { root: outerCssVars },
      { root: getters.attrs() },
    ],
    { meta: props },
  )

  const [_hovering, setItemHovering] = useState(listHovering)

  const refCombined = useCombinedRefs(ref, useEvent((el) => { onCollect(el, item) }))

  const [closableState, closeIconRender] = normalizeClosable({
    currentState: { closable },
    contextState: { closable: globalConfig.closable },
  })

  const handleClose = () => {
    onDismiss(item.key!)

    onClose?.()

    // TODO: 需要增加 closableState?.onClosed?.() 的调用
    closableState?.onClose?.()
  }

  const handleMouseEnter = () => { setItemHovering(true) }

  const handleMouseLeave = () => { setItemHovering(false) }

  // useEffect(() => {
  //   if (listHovering) {
  //     handlePauseTimer()
  //   }
  //   else if (!itemHovering) {
  //     handleResumeTimer()
  //   }
  // }, [listHovering, itemHovering])

  return {
    omitted: props,
    ns,
    cssNames,
    cssAttrs,
    refCombined,
    globalConfig,
    closeIconRender,
    handleClose,
    handleMouseEnter,
    handleMouseLeave,
  }
}
