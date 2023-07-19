<script setup lang="ts">
import { ref } from 'vue';
import { Alert } from '@ui/components';
import type { NextAuthForm, LoginExistError } from '@/auth/types';
import { fetchLoginExist } from '@/auth/services';
import { AuthForm } from './components';
import { unmaskPhone } from '@/app/lib/helpers';
import { useRequestStatus } from '@/auth/composables';

const emit = defineEmits<{
    (e: 'show-next', value: NextAuthForm): void;
}>();

const loginError = ref<string | null>(null);
const { pending, error, clearErrors } = useRequestStatus({ errors: [loginError] });

const onSubmit = async (login: string) => {
    const preparedLogin = login.includes('@') ? login : unmaskPhone(login);

    try {
        clearErrors();
        pending.value = true;
        const response = await fetchLoginExist(preparedLogin);
        const nextData: NextAuthForm = {
            form: 'login',
            data: {
                loginValue: preparedLogin,
                loginType: response.loginType,
                isVerified: response.isVerified,
            },
        };
        emit('show-next', nextData);
    } catch (e) {
        const err = e as LoginExistError;

        if (err.status === 404) {
            // user doesn't exist
            const nextData: NextAuthForm = {
                form: 'registration',
                data: {
                    loginValue: preparedLogin,
                    loginType: err.data.loginType,
                    isVerified: false,
                },
            };
            emit('show-next', nextData);
        } else if (err.status === 422) {
            // login error
            loginError.value = err.data.message;
        } else {
            error.value = 'Неизвестная ошибка';
        }
    } finally {
        pending.value = false;
    }
};
</script>

<template>
    <div class="space-y-4">
        <Alert v-if="error" variant="error" :text="error" />
        <AuthForm
            :pending="pending"
            :error="loginError"
            :is-error="error !== null || loginError !== null"
            @submit="onSubmit"
            @clear-errors="clearErrors"
        />
    </div>
</template>
