import type { HasClosable } from '@mink-ui/core/_shared/types'
import type { MayBe } from '@mink-ui/shared'

import { withDefaults } from '@mink-ui/core/_shared/utils'
import { isNull, isObject, isUndefined } from '@mink-ui/shared'

export default function formatState(state: MayBe<HasClosable>) {
  const closable = state ? state.closable : undefined

  const closeIcon = state ? state.closeIcon : undefined

  if (isUndefined(closable)) {
    if (isNull(closeIcon)) return false

    if (isUndefined(closeIcon)) return undefined

    return { closeIcon }
  }

  if (closable === false) return false

  const config = { closeIcon }

  return isObject(closable) ? withDefaults(closable, config) : config
}
