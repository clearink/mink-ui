import { cls } from '../../../_shared/utils';
export default function useFormatClassNames(prefixCls, props, context) {
    const { className, classNames = {} } = props;
    return {
        root: cls(prefixCls, context?.className, className, classNames.root),
        body: cls(`${prefixCls}__body`, classNames.body),
        closeBtn: cls(`${prefixCls}__close-btn`, classNames.closeBtn),
        footer: cls(`${prefixCls}__footer`, classNames.footer),
        header: cls(`${prefixCls}__header`, classNames.header),
        main: cls(`${prefixCls}__main`, classNames.main),
    };
}
