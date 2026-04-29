import { useMemo } from 'react';
export function useSemanticStyles(props, context) {
    const { style, styles } = props;
    const { style: ctx } = context || {};
    return useMemo(() => {
        const result = { ...styles };
        if (style || ctx)
            result.root = { ...ctx, ...style, ...result.root };
        return result;
    }, [ctx, style, styles]);
}
