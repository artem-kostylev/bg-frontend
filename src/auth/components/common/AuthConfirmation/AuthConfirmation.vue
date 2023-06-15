<script setup lang="ts">
import { ref, computed } from 'vue';
import { Confirmation } from '@/app/components';
import type { LoginInfo, ConfirmError } from '@/auth/types';
import { fetchVerifyCheck, fetchLogin } from '@/auth/services';
import type { FetchVerifyCheckResponse, FetchLoginResponse } from '@/auth/services';
import { useAuthStore } from '@/auth/stores/auth';
import { useRequestStatus } from '@/auth/composables';
import { phoneMask } from '@/app/lib/helpers';

type Props = {
    verifySent: boolean;
    loginInfo: LoginInfo;
    password?: string | null;
    onlySend?: boolean;
    step?: string;
    incorrectCode?: string | null;
};

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'change-login'): void;
    (e: 'submit', value: string): void;
    (e: 'close'): void;
    (e: 'clear-errors'): void;
}>();

const label = computed(() => {
    const loginTypeText = props.loginInfo.loginType === 'email' ? 'на ' : 'в СМС на ';
    return `${props.step || ''}Введите код, высланный Вам ${loginTypeText}`;
});

const authStore = useAuthStore();
const { setUser, setAccessToken } = authStore;

const saveUser = (response: FetchVerifyCheckResponse | FetchLoginResponse) => {
    response.user && setUser(response.user);
    response.token && setAccessToken(response.token);
};

const codeError = ref<string | null>(null);
const { pending, error, clearErrors } = useRequestStatus({ errors: [codeError] });

const submit = async (code: string) => {
    if (!props.verifySent) return;

    if (props.onlySend) {
        emit('submit', code);
        return;
    }

    try {
        clearErrors();
        pending.value = true;

        const verifyResponse = await fetchVerifyCheck(code, props.loginInfo);
        if (!verifyResponse) return;

        if (props.loginInfo.loginType === 'phone') {
            saveUser(verifyResponse);
        } else if (props.password) {
            const loginResponse = await fetchLogin(props.password, props.loginInfo);
            loginResponse && saveUser(loginResponse);
        }

        emit('close');
    } catch (e) {
        const err = e as ConfirmError;

        if (err.status === 422 && err.data?.errors?.code?.length) {
            codeError.value = 'Неверный код подтверждения';
            error.value = err.data.errors.code[0];
        } else {
            error.value = 'Неизвестная ошибка';
        }
    } finally {
        pending.value = false;
    }
};

const incorrectLabel = computed(() => {
    const loginTypeText = props.loginInfo.loginType === 'email' ? 'E-mail' : 'номером телефона';
    return `войдите с другим ${loginTypeText}`;
});

const changeLogin = () => {
    emit('change-login');
};

const clearAllErrors = () => {
    clearErrors();
    emit('clear-errors');
};
</script>

<template>
    <Confirmation
        :error="error || incorrectCode"
        :input-disabled="pending || !verifySent"
        @submit="submit"
        @clear-errors="clearAllErrors"
    >
        <template #label>
            <span>{{ label }}</span>
            <span v-if="loginInfo.loginValue" class="font-semibold">
                {{
                    loginInfo.loginType === 'email'
                        ? loginInfo.loginValue
                        : phoneMask.masked(loginInfo.loginValue)
                }}
            </span>
        </template>
        <template #error>
            <div v-if="codeError">
                <span>Введите корректный код или</span>
                <button class="text-primary-500 cursor-pointer" @click="changeLogin">
                    {{ incorrectLabel }}
                </button>
            </div>
        </template>
    </Confirmation>
</template>
