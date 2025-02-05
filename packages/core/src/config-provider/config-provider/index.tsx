import { betterDisplayName } from '@mink-ui/core/_shared/utils'
import { TouchEffectContext } from '@mink-ui/core/touch-effect/_shared.context'

import type { ConfigProviderProps } from './props'

import { DisabledContext, SizeContext } from '../_shared.context'

function ConfigProvider(props: ConfigProviderProps) {
  const { children, touchEffect = {} } = props

  return (
    <TouchEffectContext.Provider value={touchEffect}>
      <DisabledContext.Provider value={undefined}>
        <SizeContext.Provider value={undefined}>{children}</SizeContext.Provider>
      </DisabledContext.Provider>
    </TouchEffectContext.Provider>
  )
}

betterDisplayName(ConfigProvider)

export default ConfigProvider
