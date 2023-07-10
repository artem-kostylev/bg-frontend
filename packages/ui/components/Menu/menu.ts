import type { Component } from 'vue';
import type { StringOrNumber, UnknownObject } from '@ui/types';

export const menuSizes = {
    md: 'px-4 py-1.5',
    lg: 'px-5 py-2.5',
};

export type MenuOption = {
    startIcon?: Component;
    [key: string]: unknown;
};

export type MenuProps = {
    labelKey?: string;
    valueKey?: string;
    descriptionKey?: string;
    childrenKey?: string;
    returnObject?: boolean;
    multiple?: boolean;
    options?: MenuOption[] | null;
    modelValue?: StringOrNumber | StringOrNumber[] | UnknownObject | UnknownObject[] | null;
    dropdown?: boolean;
    size?: keyof typeof menuSizes;
};

export const defaultMenuProps = {
    modelValue: '',
    size: 'md',
    labelKey: 'label',
    valueKey: 'value',
    descriptionKey: 'description',
    childrenKey: 'children',
} as const;
