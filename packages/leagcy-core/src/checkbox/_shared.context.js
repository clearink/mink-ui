import { noop } from '@mink-ui/shared';
import { ctxHelper } from '../_shared/utils';
export const CheckboxGroupContext = ctxHelper({
    cancelValue: noop,
    registerValue: noop,
}, 'CheckboxGroupContext');
