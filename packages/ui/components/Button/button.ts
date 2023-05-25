import type { Component } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

export const buttonJustifies = {
    left: 'justify-start',
    right: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
};

export const buttonVariants = {
    base: 'bg-white border border-secondary-300 text-black hover:border-secondary-400 shadow-sm',
    secondary: 'bg-secondary-200 border border-transparent text-black hover:bg-secondary-300/80',
    primary:
        'bg-primary-500 hover:bg-primary-500/95 border border-transparent text-white shadow-sm',
    success: 'bg-success-700 border border-transparent text-white hover:bg-success-800 shadow-sm',
    danger: 'bg-danger-700 border border-transparent text-white hover:bg-danger-800 shadow-sm',
};

export const buttonSizes = {
    xs: 'px-3 py-2 text-sm',
    sm: 'px-3.5 py-[.531rem] text-[.938rem]',
    md: 'px-3.5 py-[.531rem] text-base',
    lg: 'px-4 py-2.5 text-lg',
};

export const buttonDefaultProps = {
    variant: 'base',
    size: 'md',
    strong: true,
    type: 'button',
    justify: 'center',
    as: 'button',
} as const;

export type ButtonProps = {
    type?: 'button' | 'reset' | 'submit';
    variant?: keyof typeof buttonVariants;
    size?: keyof typeof buttonSizes;
    justify?: keyof typeof buttonJustifies;
    disabled?: boolean;
    loading?: boolean;
    startIcon?: Component;
    endIcon?: Component;
    strong?: boolean;
    block?: boolean;
    to?: RouteLocationRaw;
    as?: Object | string | Component;
};
