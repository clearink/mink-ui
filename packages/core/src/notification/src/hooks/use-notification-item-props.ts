import type { NotificationItemProps } from '../notification-item.props'

import { useState } from 'react'

import { useCombinedRefs } from '../../../_shared/hooks/use-combined-refs'
import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { normalizeClosable } from '../../../_shared/utils/closable'
import { useNotificationItemClassNames } from './use-class-names'

export function useNotificationItemProps(props: NotificationItemProps) {
  const globalConfig = useConfiguration('notification')

  const {
    ref,
    config,
    getters,
    listHovering,
    outerCssNames,
    outerCssAttrs,
    outerCssVars,
    onCollect,
    onDismiss,
  } = props
  const { closable, onClose } = config

  const { ns, classNames } = useNotificationItemClassNames(props)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      outerCssNames,
      classNames,
      config.classNames,
      { root: config.className },
      { root: getters.names() },
    ],
    [
      outerCssAttrs,
      config.styles,
      { root: config.style },
      { root: outerCssVars },
      { root: getters.attrs() },
    ],
    { meta: props },
  )

  const [itemHovering, setItemHovering] = useState(listHovering)

  const refCombined = useCombinedRefs(ref, (el) => { onCollect(el, config) })

  const [closableState, closeIconRender] = normalizeClosable({
    currentState: { closable },
    contextState: { closable: globalConfig.closable },
  })

  const handleClose = () => {
    onDismiss(config.key!)

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
