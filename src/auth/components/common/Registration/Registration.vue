<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { Alert } from '@ui/components';
import { RegistrationForm } from './components';
import { AuthConfirmation } from '@/auth/components';
import type {
    NextAuthForm,
    AuthenticationTitle,
    LoginInfo,
    LoginType,
    RegisterForm as RegisterFormType,
    RegisterError,
    RegisterErrors,
} from '@/auth/types';
import { removeEmptyKeys, unmaskPhone } from '@/app/lib/helpers';
import { fetchRegister } from '@/auth/services';
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

const password = ref<string | null>(null);

const prepareData = (form: RegisterFormType) => {
    form.password && (password.value = form.password);
    form.phone && (form.phone = unmaskPhone(form.phone));

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

const errors = ref<RegisterErrors | null>(null);
const { pending, error, clearErrors, clearFieldErrors } = useRequestStatus({
    fieldErrors: errors as Ref<{
        [key: string]: string[] | undefined;
    } | null>,
});
const { showConfirmation, verifySent, verify } = useVerify(props.loginInfo, pending, error);

const onSubmit = async (form: RegisterFormType) => {
    const result = prepareData(form);

    try {
        clearErrors();
        pending.value = true;
        await fetchRegister(result);
        emit(
            'set-title',
            props.loginInfo.loginType === 'email'
                ? 'Подтверждение регистрации'
                : 'Код подтверждения'
        );
        await verify();
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

const closeConfirmation = () => {
    showConfirmation.value = false;
    clearErrors();
    emit('close');
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
            :password="password"
            @close="closeConfirmation"
            @change-login="changeLogin"
        />
        <RegistrationForm
            v-else
            :login-info="loginInfo"
            :pending="pending"
            :is-error="error !== null || errors !== null"
            :errors="errors"
            @submit="onSubmit"
            @clear-errors="clearFieldErrors"
        />
    </div>
</template>
