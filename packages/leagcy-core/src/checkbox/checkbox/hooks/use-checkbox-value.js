import { useControllableState } from '../../../_shared/hooks';
export default function useCheckboxValue(props) {
    const { checked, defaultChecked, onChange } = props;
    return useControllableState({ defaultValue: defaultChecked, onChange, value: checked });
}
