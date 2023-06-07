import type { Ref } from 'vue';

export type FieldProps = {
    name?: string;
    label?: string;
    required?: boolean;
    hint?: string;
    error?: string | boolean | null | Ref<string>;
    success?: string | boolean | null | Ref<string>;
};
