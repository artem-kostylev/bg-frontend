<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue';
import { Alert, Divider } from '@ui/components';
import { AuthConfirmation } from '@/auth/components';
import { ResetForm } from './components';
import type {
    LoginInfo,
    NextAuthForm,
    ResetForm as ResetFormType,
    ResetError,
    ResetErrors,
} from '@/auth/types';
import type { SubmitError } from '@/app/types';
import {
    fetchForgotCheck,
    fetchLogin,
    fetchForgotSend,
    type FetchForgotCheckBody,
    type FetchLoginResponse,
} from '@/auth/services';
import { useRequestStatus, useVerify } from '@/auth/composables';
import { useAuthStore } from '@/auth/stores/auth';

type Props = {
    loginInfo: LoginInfo;
};

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'show-next', value: NextAuthForm): void;
    (e: 'close'): void;
}>();

const errors = ref<ResetErrors | null>(null);
const { pending, error, clearErrors } = useRequestStatus({
    fieldErrors: errors as Ref<{
        [key: string]: string[] | undefined;
    } | null>,
});

const { showConfirmation, verifySent, verifySendError } = useVerify(
    props.loginInfo,
    pending,
    error
);

const forgot = async () => {
    try {
        clearErrors();
        showConfirmation.value = true;
        pending.value = true;
        await fetchForgotSend(props.loginInfo);
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
    await forgot();
});

const code = ref<string | null>(null);
const confirm = (newCode: string) => {
    code.value = newCode;
};

const authStore = useAuthStore();
const { setUser, setAccessToken } = authStore;

const saveUser = (response: FetchLoginResponse) => {
    setUser(response.user);
    setAccessToken(response.token);
};

const onSubmit = async (form: ResetFormType) => {
    if (!code.value) return;
    if (!props.loginInfo.loginValue) return;

    try {
        clearErrors();
        pending.value = true;

        const body = { ...form } as FetchForgotCheckBody;
        body.code = code.value;
        body.email = props.loginInfo.loginValue;

        await fetchForgotCheck(body);
        const response = await fetchLogin(form.password, props.loginInfo);
        response && saveUser(response);

        emit('close');
    } catch (e) {
        const err = e as ResetError;

        if (err.status === 422 && err.data.errors) {
            errors.value = err.data.errors;
        } else {
            error.value = 'Неизвестная ошибка';
        }
    } finally {
        pending.value = false;
    }
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
            @submit="confirm"
            @change-login="changeLogin"
            @clear-errors="clearErrors"
            :only-send="true"
            :incorrect-code="errors?.code && errors?.code[0]"
            step="1. "
        />
        <Divider dashed />
        <div>2. Введите новый пароль</div>
        <ResetForm
            v-if="verifySent"
            :pending="pending"
            :is-error="error !== null || errors !== null"
            :errors="errors"
            @submit="onSubmit"
            @clear-errors="clearErrors"
        />
    </div>
</template>
