import type { Placement } from '@floating-ui/vue';

export type PopoverProps = {
    placement?: Placement;
    modelValue?: boolean;
};

export const defaultPopoverProps = {
    placement: 'bottom-start',
    modelValue: undefined,
} as const;
