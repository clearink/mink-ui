import { betterDisplayName } from '@mink-ui/core/_shared/utils'
import { isFunction } from '@mink-ui/shared'
import { memo } from 'react'

import type { ShouldUpdateProps } from './props'

function ShouldUpdate(props: ShouldUpdateProps) {
  return props.children as React.ReactElement
}

betterDisplayName(ShouldUpdate)

export default memo(ShouldUpdate, (_, { when }) => !(isFunction(when) ? when() : when))
