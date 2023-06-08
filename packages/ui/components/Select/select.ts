import type { PopoverProps } from '@ui/components/Popover/popover';
import type { MenuProps } from '@ui/components/Menu/menu';
import type { ButtonProps } from '@ui/components/Button/button';
import type { FieldProps } from '@ui/components/Field/field';

export const defaultSelectProps = {
    strong: true,
    placeholder: 'ㅤ',
} as const;

export type SelectProps = FieldProps &
    Omit<PopoverProps, 'modelValue'> &
    Pick<ButtonProps, 'strong' | 'block'> &
    MenuProps & {
        placeholder?: string;
    };
