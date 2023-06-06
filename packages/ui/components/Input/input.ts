import type { Component } from 'vue';
import type { FieldProps } from '@ui/components/Field/field';

export type InputProps = FieldProps & {
    type?: 'text' | 'password';
    placeholder?: string;
    startIcon?: Component;
    endIcon?: Component;
    modelValue?: string | number;
    loading?: boolean;
    disabled?: boolean;
    readonly?: boolean;
};

export const defaultInputProps = {
    type: 'text',
    placeholder: '',
    modelValue: '',
    label: '',
    hint: '',
    startIcon: undefined,
    endIcon: undefined,
    error: undefined,
} as const;
