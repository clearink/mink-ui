import { isFunction } from '@mink-ui/shared';
import { BREAKPOINT_MAP, INIT_MATCHES } from './breakpoint';
class BreakpointObserver {
    constructor() {
        Object.defineProperty(this, "dispatch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (e) => {
                const breakpoint = BREAKPOINT_MAP.get(e.media);
                if (breakpoint && this.matches[breakpoint] !== e.matches) {
                    this.matches[breakpoint] = e.matches;
                    this.listeners.forEach(handler => handler({ ...this.matches }));
                }
            }
        });
        // 订阅事件
        Object.defineProperty(this, "listeners", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Set()
        });
        // 断点响应值
        Object.defineProperty(this, "matches", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { ...INIT_MATCHES }
        });
        Object.defineProperty(this, "queryList", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "register", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (!window || !isFunction(window.matchMedia))
                    return;
                BREAKPOINT_MAP.forEach((breakpoint, query) => {
                    const mediaQueryList = window.matchMedia(query);
                    mediaQueryList.addEventListener('change', this.dispatch);
                    this.matches[breakpoint] = mediaQueryList.matches;
                    this.queryList.push(mediaQueryList);
                });
            }
        });
        Object.defineProperty(this, "unregister", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.queryList.forEach((mediaQueryList) => {
                    mediaQueryList.removeEventListener('change', this.dispatch);
                });
                this.queryList = [];
            }
        });
        Object.defineProperty(this, "getCurrentMatches", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => ({ ...this.matches })
        });
        Object.defineProperty(this, "subscribe", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (handler) => {
                if (!this.listeners.size)
                    this.register();
                this.listeners.add(handler);
                handler({ ...this.matches });
                return () => {
                    this.listeners.delete(handler);
                    if (!this.listeners.size)
                        this.unregister();
                };
            }
        });
    }
}
export default new BreakpointObserver();
