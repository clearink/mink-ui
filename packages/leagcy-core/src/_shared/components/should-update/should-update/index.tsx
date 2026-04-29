import type { ShouldUpdateProps } from './props'

import { memo } from 'react'

import { isFunction } from '@mink-ui/shared'

import { betterDisplayName } from '../../../utils'

function ShouldUpdate(props: ShouldUpdateProps) {
  return props.children as React.ReactElement
}

betterDisplayName(ShouldUpdate)

export default memo(ShouldUpdate, (_, { when }) => !(isFunction(when) ? when() : when))
