import type { Component } from 'vue';
import type { FieldProps } from '@ui/components/Field/field';

export type InputPasswordProps = FieldProps & {
    modelValue?: string;
    placeholder?: string;
    startIcon?: Component;
    loading?: boolean;
    disabled?: boolean;
    readonly?: boolean;
};

export const defaultInputPasswordProps = {
    modelValue: '',
    placeholder: '',
    label: '',
    hint: '',
    startIcon: undefined,
    error: undefined,
} as const;
