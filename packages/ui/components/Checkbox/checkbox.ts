import type { StringOrNumber } from '@ui/types';

export type CheckboxProps = {
    modelValue?: boolean | StringOrNumber[];
    disabled?: boolean;
    value?: string | number;
    multiple?: boolean;
    trueValue?: string | number | boolean;
    falseValue?: string | number | boolean;
};

export const defaultCheckboxProps = {
    trueValue: true,
    falseValue: false,
    modelValue: undefined,
    disabled: false,
    value: undefined,
    multiple: false,
};
