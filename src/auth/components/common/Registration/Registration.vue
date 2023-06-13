<script setup lang="ts">
import { ref } from 'vue';
import { Alert } from '@ui/components';
import { RegistrationForm } from './components';
import { AuthConfirmation } from '@/auth/components';
import type {
    AuthenticationTitle,
    LoginInfo,
    LoginType,
    RegisterForm as RegisterFormType,
    RegisterErrors,
} from '@/auth/types';
import { removeEmptyKeys } from '@/app/lib/helpers';
import { fetchRegister, fetchVerifySend } from '@/auth/services';

type Props = {
    loginInfo: LoginInfo;
};

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'set-title', value: AuthenticationTitle): void;
}>();

const password = ref<string | null>(null);

const prepareData = (form: RegisterFormType) => {
    form.password && (password.value = form.password);

    const result = removeEmptyKeys(form);
    for (const prop in result) {
        result[prop] = result[prop].trim();
    }

    if (props.loginInfo.loginType && props.loginInfo.loginValue) {
        result.main_contact = props.loginInfo.loginType;
        result[props.loginInfo.loginType] = props.loginInfo.loginValue;
    }

    return result as RegisterFormType & { main_contact: LoginType };
};

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

const pending = ref(false);
const error = ref<string | null>(null);
const errors = ref<RegisterErrors | null>(null);

const showConfirmation = ref(false);

type RegisterError = {
    status: number;
    data: {
        errors: RegisterErrors;
    };
};

const onSubmit = async (form: RegisterFormType) => {
    const result = prepareData(form);

    try {
        pending.value = true;
        await fetchRegister(result);
        emit(
            'set-title',
            props.loginInfo.loginType === 'email'
                ? 'Подтверждение регистрации'
                : 'Код подтверждения'
        );
        await verify();
        error.value = null;
    } catch (e) {
        const err = e as RegisterError;

        if (err.status === 422 && err.data.errors) {
            errors.value = err.data.errors;
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
        <AuthConfirmation
            v-if="showConfirmation"
            :verify-sent="verifySent"
            :login-info="loginInfo"
            :password="password"
            @close="showConfirmation = false"
        />
        <RegistrationForm v-else :login-info="loginInfo" :pending="pending" @submit="onSubmit" />
    </div>
</template>
