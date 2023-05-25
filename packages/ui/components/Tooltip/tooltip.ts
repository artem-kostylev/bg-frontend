import type { Placement } from '@floating-ui/vue';

export const tooltipDefaultProps = {
    placement: 'top',
} as const;

export type TooltipProps = {
    placement?: Placement;
    text: string;
};
