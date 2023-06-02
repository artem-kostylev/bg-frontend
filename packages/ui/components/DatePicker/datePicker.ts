import type { ButtonProps } from '@ui/components/Button/button';
import type { PopoverProps } from '@ui/components/Popover/popover';
import type { CalendarProps } from '@ui/components/Calendar/calendar';

export type DatePickerProps = Pick<ButtonProps, 'loading' | 'strong'> &
    Pick<PopoverProps, 'placement'> &
    CalendarProps & {
        placeholder?: string;
        format?: string;
        renderLabel?: (modelValue: string | string[]) => string;
    };

export const defaultDatePickerProps = {
    strong: undefined,
    format: 'DD.MM',
    placeholder: 'дд.мм',
};
