import { noop } from '@mink-ui/shared';
import { ctxHelper } from '../../utils';
// 嵌套时的逻辑
export const InternalToolTipContext = ctxHelper(() => noop, 'InternalToolTipContext');
