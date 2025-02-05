import { omit } from '@mink-ui/shared'
import { cloneElement, isValidElement } from 'react'

import type { HasClosable, HasIconRenderClosable } from '../../../../_shared/types'

export default function formatIcon(
  closableConfig: HasClosable | HasIconRenderClosable,
  defaultConfig: HasIconRenderClosable,
) {
  const { closeIcon } = closableConfig

  const { closeIconRender } = defaultConfig

  const ariaAttrs = omit(closableConfig, ['closable', 'closeIcon', 'closeIconRender'] as any[])

  const icon = closeIconRender ? closeIconRender(closeIcon) : closeIcon

  return isValidElement(icon) ? cloneElement(icon, ariaAttrs) : <span {...ariaAttrs}>{icon}</span>
}
