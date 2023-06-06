export type FieldProps = {
    name?: string;
    hint?: string;
    label?: string;
    status?: 'error' | 'success';
    required?: boolean;
};

export const fieldDefaultProps = {
    name: '',
    label: '',
    hint: '',
    status: undefined,
} as const;
