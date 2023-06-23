import type { Component } from 'vue';

export const alertVariants = {
    base: 'bg-white border-secondary-300',
    info: 'bg-primary-100/20 border-primary-100/30 text-primary-700',
    success: 'bg-success-600/10 border-success-600/20 text-success-700',
    warning: 'bg-warning-100 border-warning-200 text-warning-700',
    error: 'bg-danger-100 border-danger-200 text-danger-700',
};

export const alertDefaultProps = {
    variant: 'base',
} as const;

export type AlertProps = {
    variant?: 'base' | 'info' | 'success' | 'warning' | 'error';
    text?: string;
    title?: string;
    startIcon?: Component;
    // TODO: можно сделать по-другому ?
    iconProps?: unknown;
};
