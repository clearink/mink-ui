import { noop } from '@mink-ui/shared';
// 日志记录 仅提示一次
const cache = new Set();
export const logger = process.env.NODE_ENV === 'production'
    ? noop
    : (condition, ...message) => {
        if (!condition)
            return;
        const key = JSON.stringify(message);
        if (cache.has(key))
            return;
        cache.size > 10000 && cache.clear();
        cache.add(key);
        console.error(...message);
    };
