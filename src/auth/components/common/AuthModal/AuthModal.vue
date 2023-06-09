<script setup lang="ts">
import { ref, watch } from 'vue';
import { Modal } from '@ui/components';
import type {
    AuthenticationForm,
    AuthenticationTitle,
    LoginInfo,
    NextAuthForm,
} from '@/auth/types';
import { Auth, Login, Registration } from '@/auth/components';
import { useVModel } from '@vueuse/core';

type Props = {
    modelValue: boolean;
};

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();
const show = useVModel(props, 'modelValue', emit);

const currForm = ref<AuthenticationForm>('auth');
const currTitle = ref<AuthenticationTitle>('Вход');

type FormLabels = {
    [K in AuthenticationForm]: AuthenticationTitle;
};

const formLabels: FormLabels = {
    login: 'Пароль',
    registration: 'Регистрация',
    reset: 'Восстановление пароля',
    auth: 'Вход',
};

const loginInfo = ref<LoginInfo>({
    loginType: null,
    loginValue: null,
    isVerified: false,
});

const showCreatePassword = () => {
    if (
        currForm.value === 'login' &&
        !loginInfo.value.isVerified &&
        loginInfo.value.loginType === 'email'
    ) {
        currForm.value = 'reset';
        currTitle.value = 'Создание пароля';
    }
};

const showNext = (nextData: NextAuthForm) => {
    currForm.value = nextData.form;
    currTitle.value = formLabels[nextData.form];
    nextData.data && (loginInfo.value = { ...nextData.data });

    // if user exists, but registered by phone without password
    showCreatePassword();
};

const setTitle = (title: AuthenticationTitle) => {
    currTitle.value = title;
};

const clearFields = () => {
    loginInfo.value.loginType = null;
    loginInfo.value.loginValue = null;
    loginInfo.value.isVerified = false;

    currForm.value = 'auth';
    currTitle.value = 'Вход';
};

watch(show, value => {
    if (!value) {
        clearFields();
    }
});
</script>

<template>
    <Modal v-model="show" size="sm" :title="currTitle">
        <template #default>
            <Login
                v-if="currForm === 'login' && loginInfo.loginValue"
                :login-info="loginInfo"
                @show-next="showNext"
                @set-title="setTitle"
                @close="show = false"
            />
            <Registration
                v-else-if="currForm === 'registration' && loginInfo.loginValue"
                :login-info="loginInfo"
                @show-next="showNext"
                @set-title="setTitle"
                @close="show = false"
            />
            <Auth v-else @show-next="showNext" />
        </template>
    </Modal>
</template>
