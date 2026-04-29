import { cls } from '../../../_shared/utils';
export default function useFormatClassNames(prefixCls, props) {
    const { className, classNames = {} } = props;
    return {
        root: cls(prefixCls, {}, className, classNames.root),
    };
}
