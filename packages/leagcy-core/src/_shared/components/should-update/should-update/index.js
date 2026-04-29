import { memo } from 'react';
import { isFunction } from '@mink-ui/shared';
import { betterDisplayName } from '../../../utils';
function ShouldUpdate(props) {
    return props.children;
}
betterDisplayName(ShouldUpdate);
export default memo(ShouldUpdate, (_, { when }) => !(isFunction(when) ? when() : when));
