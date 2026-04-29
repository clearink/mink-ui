import { isObject, isUndefined } from '@mink-ui/shared';
export function withDefaults(source, ...partials) {
    const result = { ...source };
    for (let len = partials.length, i = 0; i < len; i++) {
        const partial = partials[i];
        if (!isObject(partial))
            continue;
        const keys = Object.keys(partial);
        for (let len = keys.length, i = 0; i < len; i++) {
            const k = keys[i];
            if (isUndefined(source[k]))
                result[k] = partial[k];
        }
    }
    return result;
}
