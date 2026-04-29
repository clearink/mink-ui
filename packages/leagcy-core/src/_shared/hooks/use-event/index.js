import { useCallback, useMemo, useRef } from 'react';
// 使用 ref 获得一个memoized 函数 该函数 引用不会变 但是永远会得到最新的数据
export function useEvent(callback) {
    const ref = useRef(callback);
    // 兼容 react devtool
    useMemo(() => { ref.current = callback; }, [callback]);
    return useCallback((...args) => (0, ref.current)(...args), []);
}
