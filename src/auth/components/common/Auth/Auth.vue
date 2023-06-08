<script setup lang="ts">
import { ref } from 'vue';
import { Alert } from '@ui/components';
import type { NextAuthForm, LoginType } from '@/auth/types';
import { fetchLoginExist } from '@/auth/services';
import { AuthForm } from './components';

const emit = defineEmits<{
    (e: 'show-next', value: NextAuthForm): void;
}>();

const pending = ref(false);
const error = ref<string | null>(null);
const loginError = ref<string | null>(null);

type SubmitError = {
    status: number;
    data: {
        message: string;
        loginType: LoginType;
    };
};

const onSubmit = async (login: string) => {
    try {
        pending.value = true;
        const response = await fetchLoginExist(login);
        const nextData: NextAuthForm = {
            form: 'login',
            data: {
                loginValue: login,
                loginType: response.loginType,
                isVerified: response.isVerified,
            },
        };
        emit('show-next', nextData);
    } catch (e) {
        const err = e as SubmitError;

        if (err.status === 404) {
            // user doesn't exist
            const nextData: NextAuthForm = {
                form: 'registration',
                data: {
                    loginValue: login,
                    loginType: err.data.loginType,
                    isVerified: false,
                },
            };

            emit('show-next', nextData);
        } else {
            // login error
            loginError.value = err.status === 422 ? err.data.message : 'Неизвестная ошибка';
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
            :login-error="loginError"
            :pending="pending"
            :btn-disabled="error !== null || loginError !== null"
            @submit="onSubmit"
        />
    </div>
</template>
