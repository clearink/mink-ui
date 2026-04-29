import type { GlobalConfig } from './_shared.props'
import type { ConfigProviderProps } from './config-provider.props'

import { useMemo } from 'react'
import { IconConfigContext } from '@mink-ui/icons/IconConfigContext'
import { isUndefined } from '@mink-ui/shared/is/is-undefined'
import { pick } from '@mink-ui/shared/object/pick'
import { shallowMerge } from '@mink-ui/shared/object/shallow-merge'

import { useComputed } from '../../_shared/hooks/use-computed'
import { defineName } from '../../_shared/utils/define-name'
import { TouchEffectContext } from '../../touch-effect/src/_shared.context'
import { DisabledContext, GlobalConfigContext, LayerLevelContext, SizeContext } from './_shared.context'
import { includedGlobalConfigNames } from './config-provider.props'
import { shouldGlobalConfigUpdate } from './utils/helpers'

function ConfigProvider(props: ConfigProviderProps) {
  const globalConfigContext = GlobalConfigContext.use()

  const globalConfig: GlobalConfig = shallowMerge(
    pick(props, includedGlobalConfigNames),
    globalConfigContext,
    {
      size: SizeContext.use(),
      disabled: DisabledContext.use(),
      getLayerLevel: LayerLevelContext.use(),
      touchEffect: TouchEffectContext.use(),
    },
  )

  let element = props.children
  const { size, disabled, touchEffect, getLayerLevel, iconPrefixCls } = globalConfig

  const iconConfig = useMemo(() => ({ prefixCls: iconPrefixCls }), [iconPrefixCls])

  const globalConfigContextValue = useComputed({
    deps: globalConfig,
    compare: shouldGlobalConfigUpdate,
    factory: () => globalConfig,
  })

  if (!isUndefined(size)) {
    element = <SizeContext value={size}>{element}</SizeContext>
  }

  if (!isUndefined(disabled)) {
    element = <DisabledContext value={disabled}>{element}</DisabledContext>
  }

  if (!isUndefined(touchEffect)) {
    element = <TouchEffectContext value={touchEffect}>{element}</TouchEffectContext>
  }

  if (!isUndefined(getLayerLevel)) {
    element = <LayerLevelContext value={getLayerLevel}>{element}</LayerLevelContext>
  }

  if (!isUndefined(iconConfig.prefixCls)) {
    element = <IconConfigContext value={iconConfig}>{element}</IconConfigContext>
  }

  return (
    <GlobalConfigContext value={globalConfigContextValue}>
      {element}
    </GlobalConfigContext>
  )
}

defineName(ConfigProvider)

export default ConfigProvider
