<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Alert } from '@ui/components';
import { LoginForm, ForgotPasswordTip } from './components';
import { AuthConfirmation } from '@/auth/components';
import type { LoginInfo, NextAuthForm, AuthenticationTitle } from '@/auth/types';
import { fetchVerifySend, fetchLogin } from '@/auth/services';
import type { fetchLoginResponse } from '@/auth/services';
import { useAuthStore } from '@/auth/stores/auth';

type Props = {
    loginInfo: LoginInfo;
};

const props = defineProps<Props>();

const showConfirmation = ref(false);

const emit = defineEmits<{
    (e: 'show-next', value: NextAuthForm): void;
    (e: 'set-title', value: AuthenticationTitle): void;
    (e: 'close'): void;
}>();

const pending = ref(false);
const error = ref<string | null>(null);

const verifySent = ref(false);
const verifySendError = ref(false);

type SubmitError = {
    status: number;
    data: {
        message: string;
    };
};

const verify = async () => {
    try {
        emit('set-title', 'Код подтверждения');
        showConfirmation.value = true;
        pending.value = true;

        await fetchVerifySend(props.loginInfo);

        error.value = null;
        verifySent.value = true;
    } catch (e) {
        const err = e as SubmitError;

        if (err.status === 422) {
            error.value = err.data.message;
        } else {
            error.value = 'Неизвестная ошибка';
        }

        verifySendError.value = true;
        showConfirmation.value = false;
    } finally {
        pending.value = false;
    }
};

onMounted(async () => {
    if (props.loginInfo.loginType === 'phone') {
        await verify();
    }
});

const authStore = useAuthStore();
const { setUser, setAccessToken } = authStore;

const saveUser = (response: fetchLoginResponse) => {
    setUser(response.user);
    setAccessToken(response.token);
};

const passwordError = ref<string | null>(null);
const incorrectPassword = ref(false);
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
            incorrectPassword.value = true;
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
</script>

<template>
    <div class="space-y-4">
        <Alert v-if="error" variant="error" :text="error" />
        <AuthConfirmation
            v-if="showConfirmation"
            :verify-sent="verifySent"
            :login-info="loginInfo"
            @close="showConfirmation = false"
        />
        <div v-else-if="!verifySendError" class="space-y-4">
            <LoginForm
                :error="passwordError"
                :btn-disabled="incorrectPassword"
                :pending="pending"
                @submit="onSubmit"
            />
            <ForgotPasswordTip
                v-model="showTip"
                :login-info="loginInfo"
                :error="incorrectPassword"
                :pending="pending"
                @reset-password="resetPassword"
            />
        </div>
    </div>
</template>
