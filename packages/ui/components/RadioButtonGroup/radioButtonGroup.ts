import type { ButtonProps } from '@ui/components/Button/button';
import type { FieldProps } from '@ui/components/Field/field';

export type Option = {
    label: string;
    value: string | number | boolean;
};

export type RadioButtonGroupProps = ButtonProps &
    FieldProps & {
        options?: Option[];
        modelValue?: string | number | boolean;
    };
