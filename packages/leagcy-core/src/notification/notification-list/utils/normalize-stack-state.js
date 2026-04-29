function filterElements(refs) {
    return Array.from(refs.components || [])
        .reduce((result, [key, { isExiting, isExited, element }]) => {
        const panel = refs.panels.get(key);
        if (panel && element && !(isExiting || isExited)) {
            result.push([panel, element, key]);
        }
        return result;
    }, []);
}
export default function normalizeStackState(options) {
    const { props: { placement }, refs, stackEnable, stackConfig } = options;
    const { threshold, gap, offset } = stackConfig;
    const nextTransforms = new Map();
    const elements = filterElements(refs);
    if (stackEnable)
        elements.reverse();
    if (!elements.length)
        return nextTransforms;
    const factor = placement.startsWith('top') ? 1 : -1;
    const count = elements.length;
    const isExpanded = count <= threshold || refs.hovers.size > 0;
    const latest = elements[0][0];
    for (let scale = 1, i = 0, delta = 0; i < count; i++) {
        const [panel, wrapper, key] = elements[i];
        const height = (isExpanded ? panel : latest).offsetHeight;
        nextTransforms.set(key, { delta, scale, height, wrapper });
        if (i >= count - 1)
            continue;
        delta += (isExpanded ? panel.offsetHeight + gap : offset) * factor;
        if (!isExpanded)
            scale = 1 - offset * 2 * Math.min(i + 1, 3) / latest.offsetWidth;
    }
    return nextTransforms;
}
