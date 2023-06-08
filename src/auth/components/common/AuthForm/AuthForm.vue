<script setup lang="ts">
import { ref } from 'vue';
import { Button, Input, Alert } from '@ui/components';
import { useVuelidate } from '@vuelidate/core';
import { required, emailOrNumber } from '@/app/lib';
import type { NextAuthForm, LoginType } from '@/auth/types';
import { fetchLoginExist } from '@/auth/services';

const form = ref({
    login: '',
});

const rules = {
    login: {
        required,
        emailOrNumber,
    },
};

const v$ = useVuelidate(rules, form);

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

const onSubmit = async () => {
    if (!(await v$.value.$validate())) return;

    const login = form.value.login;

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
        <Input
            v-model="v$.login.$model"
            name="login"
            placeholder="E-mail или Телефон"
            :error="v$.login.$errors[0]?.$message || loginError"
            @keyup.enter="onSubmit"
        />
        <div class="flex justify-center mt-2.5">
            <Button
                variant="primary"
                :loading="pending"
                :disabled="v$.$errors?.length > 0 || error !== null || loginError !== null"
                @click="onSubmit"
                >Продолжить</Button
            >
        </div>
    </div>
</template>
