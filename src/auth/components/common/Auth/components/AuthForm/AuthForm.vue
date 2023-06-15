<script setup lang="ts">
import { Button, Input } from '@ui/components';
import { required, emailOrNumber } from '@/app/lib';
import { vMaska } from 'maska';
import type { AuthFormProps } from '@/auth/types';
import { useSimpleForm, useMaskOptions } from '@/auth/composables';

defineProps<AuthFormProps>();

const emit = defineEmits<{
    (e: 'submit', value: string): void;
    (e: 'clear-errors'): void;
}>();

const { v$, onSubmit } = useSimpleForm({
    field: 'login',
    fieldRules: [required, emailOrNumber],
    emit,
});

const { options } = useMaskOptions();
</script>

<template>
    <div class="space-y-4">
        <Input
            v-model="v$.login.$model"
            name="login"
            placeholder="E-mail или Телефон"
            :error="v$.login.$errors[0]?.$message || error"
            v-maska:[options]
            @keyup.enter="onSubmit"
        />
        <div class="flex justify-center mt-2.5">
            <Button
                variant="primary"
                :loading="pending"
                :disabled="v$.$errors.length > 0 || btnDisabled"
                @click="onSubmit"
                >Продолжить</Button
            >
        </div>
    </div>
</template>
