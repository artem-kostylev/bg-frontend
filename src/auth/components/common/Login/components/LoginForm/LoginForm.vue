<script setup lang="ts">
import { InputPassword, Button } from '@ui/components';
import { LockIcon } from '@ui/icons';
import { required } from '@/app/lib';
import type { AuthFormProps } from '@/auth/types';
import { useSimpleForm } from '@/auth/composables';

defineProps<AuthFormProps>();

const emit = defineEmits<{
    (e: 'submit', value: string): void;
    (e: 'clear-errors'): void;
}>();

const { v$, onSubmit } = useSimpleForm({
    field: 'password',
    fieldRules: [required],
    emit,
    clearErrors: true,
});
</script>

<template>
    <div class="space-y-4">
        <InputPassword
            v-model="v$.password.$model"
            name="password"
            placeholder="Пароль"
            :error="v$.password.$errors[0]?.$message || error"
            :start-icon="LockIcon"
            @keyup.enter="onSubmit"
        />
        <div class="flex justify-center mt-5">
            <Button
                variant="primary"
                :loading="pending"
                :disabled="v$.$errors?.length > 0 || btnDisabled"
                @click="onSubmit"
                >Продолжить</Button
            >
        </div>
    </div>
</template>
