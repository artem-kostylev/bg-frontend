import type { ButtonProps } from '@ui/components/Button/button';
import type { PopoverProps } from '@ui/components/Popover/popover';
import type {
    RangeNumberModelValue,
    RangeNumberProps,
} from '@ui/components/RangeNumber/rangeNumber';

export type NumberPickerProps = Pick<ButtonProps, 'endIcon' | 'loading' | 'strong'> &
    Pick<PopoverProps, 'placement'> &
    RangeNumberProps & {
        placeholder?: string;
        renderLabel?: (modelValue: RangeNumberModelValue) => string | number;
    };

export const defaultNumberPickerProps = {
    strong: undefined,
    placeholder: 'ㅤ',
};
