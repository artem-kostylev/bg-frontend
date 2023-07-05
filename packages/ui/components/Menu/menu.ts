import type { Component } from 'vue';
import type { StringOrNumber, UnknownObject } from '@ui/types';

export type MenuOption = {
    startIcon?: Component;
    [key: string]: unknown;
};

export type MenuProps = {
    size?: 'md' | 'lg';
    labelKey?: string;
    valueKey?: string;
    descriptionKey?: string;
    childrenKey?: string;
    returnObject?: boolean;
    multiple?: boolean;
    options: MenuOption[];
    modelValue?: StringOrNumber | StringOrNumber[] | UnknownObject | UnknownObject[];
    dropdown?: boolean;
};

export const defaultMenuProps = {
    size: 'md',
    modelValue: '',
    labelKey: 'label',
    valueKey: 'value',
    descriptionKey: 'description',
    childrenKey: 'children',
} as const;
