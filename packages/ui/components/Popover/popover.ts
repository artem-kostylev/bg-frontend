import type { Placement } from '@floating-ui/vue';

export type PopoverProps = {
    trigger?: 'click' | 'hover';
    placement?: Placement;
    modelValue?: boolean;
};

export const defaultPopoverProps = {
    placement: 'bottom-start',
    trigger: 'click',
    modelValue: undefined,
} as const;
