import type { PopoverProps } from '@ui/components/Popover/popover';
import type { MenuProps } from '@ui/components/Menu/menu';
import type { ButtonProps } from '@ui/components/Button/button';

export const defaultSelectProps = {
    strong: true,
    placeholder: 'ㅤ',
} as const;

export type SelectProps = Omit<PopoverProps, 'modelValue'> &
    Pick<ButtonProps, 'strong'> &
    MenuProps & {
        placeholder?: string;
    };
