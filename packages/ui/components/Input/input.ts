import type { Component } from 'vue';

export type InputProps = {
    disabled?: boolean;
    readonly?: boolean;
    modelValue?: string | number | null;
    placeholder?: string;
    autocomplete?: string;
    size?: 'sm' | 'md' | 'lg';
    type?: 'text' | 'password' | 'number';
    startIcon?: Component;
    endIcon?: Component;
    name?: string;
    hint?: string;
    label?: string;
    status?: 'error' | 'success';
    required?: boolean;
    justify?: 'center';
    clickable?: boolean;
};

export const inputDefaultProps = {
    size: 'md',
    type: 'text',
    modelValue: '',
    placeholder: '',
    autocomplete: 'off',
    startIcon: undefined,
    endIcon: undefined,
    name: '',
    hint: '',
    label: '',
    status: undefined,
    justify: undefined,
    clickable: false,
} as const;
