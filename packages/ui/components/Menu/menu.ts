import type { Component } from 'vue';
import type { StringOrNumber } from '@ui/types';

export const menuSizes = {
    md: 'px-4 py-1.5',
    lg: 'px-5 py-2.5',
};

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
    size?: keyof typeof menuSizes;
};

export const defaultMenuProps = {
    modelValue: '',
    size: 'md',
} as const;
