import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { isUndefined, pick } from '@mink-ui/shared';
import { Portal } from '../../_shared/components';
import { notificationPlacement, presetStatus } from '../../_shared/constants';
import { useConstant, useForceUpdate } from '../../_shared/hooks';
import { makeUniqueId, withDefaults } from '../../_shared/utils';
import { defaultNotificationConfig } from '../_shared.props';
import globalConfig from '../global-notification-config';
import NotificationList from '../notification-list';
import { defaultNotificationNoticeProps } from '../notification-notice/props';
const included = ['duration', 'pauseOnHover', 'placement', 'showProgress', 'closable', 'closeIcon'];
export class NotificationState {
    constructor() {
        // 与 GroupTransition 不同
        // configs 无法从 props 中初始化
        // 所以需要保证 uniqueId 函数的唯一
        Object.defineProperty(this, "uniqueId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: makeUniqueId('nt-')
        });
        Object.defineProperty(this, "configs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: notificationPlacement.map((placement) => {
                return { placement, visible: false, notices: [] };
            })
        });
    }
}
export class NotificationAction {
    get configs() {
        return this.states.configs;
    }
    constructor(forceUpdate, states) {
        Object.defineProperty(this, "forceUpdate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: forceUpdate
        });
        Object.defineProperty(this, "states", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: states
        });
        Object.defineProperty(this, "open", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (_config) => {
                const notice = withDefaults(_config, { key: isUndefined(_config.key) ? this.states.uniqueId() : _config.key }, pick(globalConfig.get(), included), pick(defaultNotificationNoticeProps, included));
                const position = this.configs.find(e => e.placement === notice.placement);
                if (!position)
                    return;
                // notice.key 相同的逻辑
                position.notices.push(notice);
                position.visible = true;
                this.forceUpdate();
                // max count 逻辑呢?
                // config.notices = config.notices.slice(-5)
            }
        });
        Object.defineProperty(this, "close", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key) => {
                let shouldUpdate = isUndefined(key);
                this.states.configs = this.states.configs.map((config) => {
                    const { notices } = config;
                    if (isUndefined(key))
                        return { ...config, notices: [] };
                    const newNotices = notices.filter(item => item.key !== key);
                    if (newNotices.length === notices.length)
                        return config;
                    shouldUpdate = true;
                    return { ...config, notices: newNotices };
                });
                if (shouldUpdate)
                    this.forceUpdate();
            }
        });
        Object.defineProperty(this, "finish", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (placement) => {
                this.states.configs = this.states.configs.map((config) => {
                    if (config.placement !== placement)
                        return config;
                    return { ...config, visible: config.notices.length > 0 };
                }, null);
                this.forceUpdate();
            }
        });
        Object.defineProperty(this, "inject", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const statusMethods = presetStatus.reduce((methods, status) => {
                    methods[status] = (props) => { this.open({ ...props, type: status }); };
                    return methods;
                }, {});
                return { open: this.open, close: this.close, ...statusMethods };
            }
        });
    }
}
export default function useNotification(_config) {
    const config = withDefaults(_config || {}, defaultNotificationConfig);
    const { getContainer, top, bottom, stack, maxCount } = config;
    const update = useForceUpdate();
    const states = useConstant(() => new NotificationState());
    const actions = useMemo(() => new NotificationAction(update, states), [update, states]);
    const methods = useMemo(() => actions.inject(), [actions]);
    return [
        methods,
        _jsx(Portal, { getContainer: getContainer, children: states.configs.map((config) => {
                return config.visible && (_jsx(NotificationList, { bottom: bottom, maxCount: maxCount, notices: config.notices, placement: config.placement, stack: stack, top: top, onClose: (key) => { methods.close(key); }, onFinished: () => { actions.finish(config.placement); } }, config.placement));
            }) }),
    ];
}
