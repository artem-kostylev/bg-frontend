import type { ButtonProps } from '@ui/components/Button/button';
import type { FieldProps } from '@ui/components/Field/field';

export const defaultSelectButtonProps = {
    strong: true,
    placeholder: 'ㅤ',
} as const;

export type SelectButtonProps = FieldProps &
    Pick<ButtonProps, 'strong' | 'block' | 'disabled' | 'loading'> & {
        placeholder?: string;
        value?: unknown;
        open?: boolean;
    };
