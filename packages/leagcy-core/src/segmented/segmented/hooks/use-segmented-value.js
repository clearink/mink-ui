import { fallback } from '@mink-ui/shared';
import { useControllableState } from '../../../_shared/hooks';
export default function useSegmentedValue(props, options) {
    const { defaultValue, onChange, value } = props;
    return useControllableState({
        defaultValue: fallback(defaultValue, options[0]?.value),
        onChange,
        value,
    });
}
