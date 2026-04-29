import { fallback, isObject } from '@mink-ui/shared';
export default function normalizeOptions(options = []) {
    return options.map((item) => {
        if (!isObject(item))
            return { label: item, title: `${item}`, value: item };
        const { label, title } = item;
        const htmlTitle = fallback(title, isObject(label) ? undefined : `${label}`);
        return { ...item, title: htmlTitle };
    });
}
