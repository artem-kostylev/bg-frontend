import { ref, onBeforeUnmount, type Ref } from 'vue';

export function useRequestStatus({
    errors,
    fieldErrors,
}: {
    errors?: Ref<string | null>[];
    fieldErrors?: Ref<{
        [key: string]: string[] | undefined;
    } | null>;
}) {
    const pending = ref(false);
    const error = ref<string | null>(null);

    const clearFieldErrors = (errorKey?: string) => {
        if (fieldErrors?.value && errorKey != null) {
            fieldErrors.value[errorKey] = [];
        } else if (fieldErrors) {
            error.value = null;
            fieldErrors.value = null;
        }
    };

    const clearErrors = () => {
        error.value = null;

        if (errors) {
            errors.forEach(e => {
                e.value = null;
            });
        }

        fieldErrors && clearFieldErrors();
    };

    onBeforeUnmount(() => {
        pending.value = false;
        clearErrors();
    });

    return {
        pending,
        error,
        clearErrors,
        clearFieldErrors,
    };
}
