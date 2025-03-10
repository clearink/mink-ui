import type { MayBe } from '@mink-ui/shared'

import { CloseOutlined } from '@mink-ui/icons'
import { useMemo } from 'react'

import type { HasClosable, HasIconRenderClosable } from '../../../_shared/types'

import { withDefaults } from '../../../_shared/utils'
import formatIcon from './utils/format-icon'
import formatState from './utils/format-state'

export function useClosableState(
  props?: HasClosable,
  ctx?: MayBe<HasClosable>,
  defaults?: HasIconRenderClosable,
) {
  const propsState = useMemo(() => formatState(props), [props])

  const ctxState = useMemo(() => formatState(ctx), [ctx])

  const defaultConfig = useMemo(() => {
    return withDefaults(defaults || {}, { closeIcon: <CloseOutlined /> })
  }, [defaults])

  return useMemo<[boolean, React.ReactNode]>(() => {
    const closableConfig = (() => {
      if (propsState === false) return false

      if (propsState) return withDefaults(propsState, ctxState || null, defaultConfig)

      if (ctxState === false) return false

      if (ctxState) return withDefaults(ctxState, defaultConfig)

      return defaultConfig.closable ? defaultConfig : false
    })()

    if (closableConfig === false) return [false, null]

    return [true, formatIcon(closableConfig, defaultConfig)]
  }, [propsState, ctxState, defaultConfig])
}
