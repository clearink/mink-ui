import { useMemo } from 'react';
import { isBoolean } from '@mink-ui/shared';
import { withDefaults } from '../../../_shared/utils';
export default function useNotificationStack(props) {
    const { stack } = props;
    const needMerge = stack && !isBoolean(stack);
    const stackEnable = needMerge ? true : !!stack;
    const stackConfig = useMemo(() => {
        const defaultConfig = { threshold: 3, offset: 8, gap: 16 };
        if (!needMerge)
            return defaultConfig;
        return withDefaults(stack, defaultConfig);
    }, [needMerge, stack]);
    return { stackEnable, stackConfig };
}
