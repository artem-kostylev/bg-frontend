import { ref, watch, onBeforeUnmount, type ComputedRef } from 'vue';
import type { ValidationRuleWithParams } from '@vuelidate/core';
import { useVuelidate } from '@vuelidate/core';

export function useSimpleForm({
    field,
    fieldRules,
    emit,
    isError,
    onChange,
}: {
    field: string;
    fieldRules: ValidationRuleWithParams[];
    emit: {
        (e: 'submit', value: string): void;
        (e: 'clear-errors'): void;
    };
    isError?: ComputedRef<boolean>;
    onChange?: boolean;
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

    watch(form.value, () => {
        isError?.value && emit('clear-errors');
    });

    if (onChange) {
        watch(
            () => form.value[field],
            async () => {
                await onSubmit();
            }
        );
    }

    onBeforeUnmount(() => {
        form.value[field] = '';
    });

    return {
        v$,
        onSubmit,
    };
}
