import type { Component } from 'vue';
import type { StringOrNumber } from '@ui/types';

export type MenuOption = {
    label: string;
    value: StringOrNumber;
    startIcon?: Component;
};

export type MenuProps = {
    multiple?: boolean;
    options: MenuOption[];
    modelValue?: StringOrNumber | StringOrNumber[] | null;
    dropdown?: boolean;
};

export const defaultMenuProps = {
    modelValue: '',
};
