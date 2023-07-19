import type { Placement } from '@floating-ui/vue';

export type PopoverProps = {
    placement?: Placement;
    modelValue?: boolean;
    trigger: 'click' | 'hover';
};

export const defaultPopoverProps = {
    placement: 'bottom-start',
    modelValue: undefined,
    trigger: 'click',
} as const;
