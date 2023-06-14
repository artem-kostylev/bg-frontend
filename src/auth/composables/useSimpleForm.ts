import { ref, watch, onBeforeUnmount } from 'vue';
import type { ValidationRuleWithParams } from '@vuelidate/core';
import { useVuelidate } from '@vuelidate/core';

export function useSimpleForm({
    field,
    fieldRules,
    emit,
    onChange,
    clearErrors,
}: {
    field: string;
    fieldRules: ValidationRuleWithParams[];
    emit: {
        (e: 'submit', value: string): void;
        (e: 'clear-errors'): void;
    };
    onChange?: boolean;
    clearErrors?: boolean;
}) {
    const form = ref({
        [field]: '',
    });

    const rules = {
        [field]: {
            ...fieldRules,
        },
    };

    const v$ = useVuelidate(rules, form);

    const onSubmit = async () => {
        if (!(await v$.value.$validate())) return;
        emit('submit', form.value[field]);
    };

    if (onChange) {
        watch(
            () => form.value[field],
            async () => {
                await onSubmit();
            }
        );
    }

    if (clearErrors) {
        watch(form.value, () => {
            emit('clear-errors');
        });
    }

    onBeforeUnmount(() => {
        form.value[field] = '';
    });

    return {
        v$,
        onSubmit,
    };
}
