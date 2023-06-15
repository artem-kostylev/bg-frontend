import { watch } from 'vue';
import type { Ref } from 'vue';

export function useClearFieldErrors({
    form,
    errors,
    clearFieldError,
}: {
    form: Ref<{ [key: string]: string }>;
    errors: { [key: string]: string[] | undefined };
    clearFieldError: (key: string) => void;
}) {
    for (const key in form.value) {
        watch(
            () => form.value[key],
            () => {
                if (errors && errors[key]) {
                    clearFieldError(key);
                }
            }
        );
    }
}
