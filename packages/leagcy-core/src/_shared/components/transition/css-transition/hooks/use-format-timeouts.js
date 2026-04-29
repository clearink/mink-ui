import { useMemo } from 'react';
import { isNullish, isNumber } from '@mink-ui/shared';
import { APPEAR, ENTER, EXIT } from '../../_shared.constant';
export default function useFormatTimeouts(props) {
    const { timeouts: _timeouts } = props;
    return useMemo(() => {
        const values = {};
        if (isNullish(_timeouts))
            return values;
        const isNumeric = isNumber(_timeouts);
        values[APPEAR] = isNumeric ? _timeouts : _timeouts.appear;
        values[ENTER] = isNumeric ? _timeouts : _timeouts.enter;
        values[EXIT] = isNumeric ? _timeouts : _timeouts.exit;
        return values;
    }, [_timeouts]);
}
