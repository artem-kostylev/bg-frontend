import type { StringOrNumber } from '@ui/types';

export type RadioProps = {
    modelValue?: StringOrNumber;
    disabled?: boolean;
    value?: StringOrNumber;
};

export const defaultRadioProps = {
    modelValue: '',
    disabled: false,
};
