import { watch } from 'vue';
import type { Ref } from 'vue';
import { textTransform } from '@/app/lib/helpers';

export function useUpperCase({
    form,
    upperCaseKeys,
    errors,
    clearFieldError,
}: {
    form: Ref<{ [key: string]: string }>;
    upperCaseKeys: string[];
    errors: { [key: string]: string[] | undefined };
    clearFieldError: (key: string) => void;
}) {
    for (const key in form.value) {
        watch(
            () => form.value[key],
            () => {
                // clear error for specific field
                if (errors && errors[key]) {
                    clearFieldError(key);
                }

                if (upperCaseKeys.includes(key) && form.value[key]) {
                    form.value[key] = textTransform(form.value[key]);
                }
            }
        );
    }
}
