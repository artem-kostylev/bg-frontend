<script setup lang="ts">
import { ref, watch } from 'vue';
import { Input } from '@ui/components';
import { useVuelidate } from '@vuelidate/core';
import { required, confirmationCode } from '@/app/lib';
import { vMaska } from 'maska';

type Props = {
    error?: string | null;
    inputDisabled?: boolean;
};

defineProps<Props>();

const form = ref({
    code: '',
});

const rules = {
    code: {
        required,
        confirmationCode,
    },
};

const v$ = useVuelidate(rules, form);

const emit = defineEmits<{ (e: 'confirm', value: string): void }>();

watch(
    () => form.value.code,
    async () => {
        if (!(await v$.value.$validate())) return;
        emit('confirm', form.value.code);
    }
);
</script>

<template>
    <div class="space-y-4">
        <slot name="label" />
        <Input
            v-model="v$.code.$model"
            name="code"
            placeholder="_ _ _ _"
            :error="v$.code.$errors[0]?.$message || error"
            :disabled="inputDisabled"
            justify="center"
            class="mt-5"
            v-maska
            :data-maska="'####'"
        />
        <slot name="error" />
    </div>
</template>
