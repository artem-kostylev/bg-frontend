import type { HTMLAttributes } from 'vue';

export type CardProps = {
    coverClass?: HTMLAttributes['class'];
    bodyClass?: HTMLAttributes['class'];
    headerClass?: HTMLAttributes['class'];
    footerClass?: HTMLAttributes['class'];
};

export const cardDefaultProps = {
    coverClass: '',
    bodyClass: '',
    headerClass: '',
    footerClass: '',
} as const;
