const ms = (s) => (Number.parseFloat(s) || 0) * 1e3;
export default function collectTimeoutInfo(collection, type) {
    const style = (property) => `${collection[property] || ''}`.split(', ');
    const delays = style(`${type}Delay`);
    const len = delays.length;
    const durations = style(`${type}Duration`).map((d, i) => ms(d) + ms(delays[i % len]));
    const timeout = Math.max.apply(null, durations);
    return { count: durations.length, timeout };
}
