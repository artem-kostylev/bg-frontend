import type { Component } from 'vue';

export const iconFilledVariants = {
    base: 'border-secondary-300 bg-white',
    primary: 'border-transparent bg-primary-300/20 text-primary-500',
    warning: 'border-transparent bg-warning-100 text-warning-700',
};

export const iconFilledDefaultProps = {
    label: '',
    variant: 'base',
    width: '1.2em',
    height: '1.2em',
} as const;

export type IconFilledProps = {
    label?: string;
    icon: Component;
    variant?: keyof typeof iconFilledVariants;
    width?: string;
    height?: string;
};
