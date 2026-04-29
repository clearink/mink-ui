import { useRef } from 'react';
export function useConstant(init) {
    const ref = useRef();
    if (!ref.current)
        ref.current = { value: init() };
    return ref.current.value;
}
