import { isFunction } from '@mink-ui/shared'
import { memo } from 'react'

import type { ShouldUpdateProps } from './props'

import { betterDisplayName } from '../../../../_shared/utils'

function ShouldUpdate(props: ShouldUpdateProps) {
  return props.children as React.ReactElement
}

betterDisplayName(ShouldUpdate)

export default memo(ShouldUpdate, (_, { when }) => !(isFunction(when) ? when() : when))
