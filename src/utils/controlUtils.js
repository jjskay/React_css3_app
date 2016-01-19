import {CheckboxGroup, DropDownList, TwoWaySelector, LongitudinalSelector,MultiSelect} from '../components/UI';

var controlMapping = {
    'none': CheckboxGroup,
    listbox: CheckboxGroup,
    radiobutton: CheckboxGroup,
    checkbox: CheckboxGroup,
    dropdown: DropDownList,
    two_way: MultiSelect,
    split: CheckboxGroup,
    longitudinal: LongitudinalSelector
};

module.exports = controlMapping;