<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Alert } from '@ui/components';
import { LoginForm, ForgotPasswordTip } from './components';
import { AuthConfirmation } from '@/auth/components';
import type { LoginInfo, NextAuthForm, AuthenticationTitle, SubmitError } from '@/auth/types';
import { fetchLogin } from '@/auth/services';
import type { FetchLoginResponse } from '@/auth/services';
import { useAuthStore } from '@/auth/stores/auth';
import { useRequestStatus, useVerify } from '@/auth/composables';

type Props = {
    loginInfo: LoginInfo;
};

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'show-next', value: NextAuthForm): void;
    (e: 'set-title', value: AuthenticationTitle): void;
    (e: 'close'): void;
}>();

const passwordError = ref<string | null>(null);
const { pending, error, clearErrors } = useRequestStatus({ errors: [passwordError] });

const { showConfirmation, verifySent, verifySendError, verify } = useVerify(
    props.loginInfo,
    pending,
    error
);

onMounted(async () => {
    if (props.loginInfo.loginType === 'phone') {
        emit('set-title', 'Код подтверждения');
        await verify();
    }
});

const authStore = useAuthStore();
const { setUser, setAccessToken } = authStore;

const saveUser = (response: FetchLoginResponse) => {
    setUser(response.user);
    setAccessToken(response.token);
};

const showTip = ref(false);

const onSubmit = async (password: string) => {
    try {
        pending.value = true;
        const response = await fetchLogin(password, props.loginInfo);
        response && saveUser(response);
        emit('close');
    } catch (e) {
        const err = e as SubmitError;

        if (err.status === 401) {
            passwordError.value = 'Неверный пароль';
            showTip.value = true;
        } else if (err.status === 422) {
            passwordError.value = err.data.message;
        } else {
            error.value = 'Неизвестная ошибка';
        }
    } finally {
        pending.value = false;
    }
};
const resetPassword = () => {
    if (props.loginInfo.loginType === 'email' && props.loginInfo.loginValue) {
        emit('show-next', { form: 'reset' });
    }
};

const closeConfirmation = () => {
    showConfirmation.value = false;
    showTip.value = false;
    clearErrors();
};

const changeLogin = () => {
    emit('show-next', { form: 'auth' });
};
</script>

<template>
    <div class="space-y-4">
        <Alert v-if="error" variant="error" :text="error" />
        <AuthConfirmation
            v-if="showConfirmation"
            :verify-sent="verifySent"
            :login-info="loginInfo"
            @close="closeConfirmation"
            @change-login="changeLogin"
        />
        <div v-else-if="!verifySendError" class="space-y-4">
            <LoginForm
                :error="passwordError"
                :pending="pending"
                :btn-disabled="passwordError !== null"
                @submit="onSubmit"
                @clear-errors="clearErrors"
            />
            <ForgotPasswordTip
                v-model="showTip"
                :login-info="loginInfo"
                :error="passwordError !== null"
                :pending="pending"
                @reset-password="resetPassword"
            />
        </div>
    </div>
</template>
