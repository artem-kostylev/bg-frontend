import type { ButtonProps } from '@ui/components/Button/button';
import type { PopoverProps } from '@ui/components/Popover/popover';
import type { RangeNumberProps } from '@ui/components/RangeNumber/rangeNumber';

export type NumberPickerProps = Pick<ButtonProps, 'endIcon' | 'loading' | 'strong'> &
    Pick<PopoverProps, 'placement'> &
    RangeNumberProps;

export const defaultNumberPickerProps = {
    strong: undefined,
};
