import type { ConfigProviderProps } from './props'

import { betterDisplayName } from '../../_shared/utils'
import { TouchEffectContext } from '../../touch-effect/_shared.context'
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
