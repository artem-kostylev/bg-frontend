export type Item = {
    label: string;
    value: string | number | boolean;
};

export type RadioButtonGroupProps = {
    items: Item[];
    variant?: 'base' | 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    name?: string;
    hint?: string;
    label?: string;
    error?: boolean;
    modelValue?: string | number | boolean;
    required?: boolean;
};
