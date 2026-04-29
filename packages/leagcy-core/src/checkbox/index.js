import _Checkbox from './checkbox';
import CheckboxGroup from './checkbox-group/group';
// CompoundCheckbox
const Checkbox = Object.assign(_Checkbox, { Group: CheckboxGroup });
export { Checkbox };
export default Checkbox;
