import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { CloseOutlined } from '@mink-ui/icons';
import { withDefaults } from '../../utils';
import formatIcon from './utils/format-icon';
import formatState from './utils/format-state';
export function useClosableState(props, ctx, defaults) {
    const propsState = useMemo(() => formatState(props), [props]);
    const ctxState = useMemo(() => formatState(ctx), [ctx]);
    const defaultConfig = useMemo(() => {
        return withDefaults(defaults || {}, { closeIcon: _jsx(CloseOutlined, {}) });
    }, [defaults]);
    return useMemo(() => {
        const closableConfig = (() => {
            if (propsState === false)
                return false;
            if (propsState)
                return withDefaults(propsState, ctxState || null, defaultConfig);
            if (ctxState === false)
                return false;
            if (ctxState)
                return withDefaults(ctxState, defaultConfig);
            return defaultConfig.closable ? defaultConfig : false;
        })();
        if (closableConfig === false)
            return [false, null];
        return [true, formatIcon(closableConfig, defaultConfig)];
    }, [propsState, ctxState, defaultConfig]);
}
