<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@ui/components';
import type {
    AuthenticationForm,
    AuthenticationLabel,
    LoginInfo,
    NextAuthForm,
} from '@/auth/types';
import { AuthForm } from '@/auth/components';
import { useVModel } from '@vueuse/core';

type Props = {
    modelValue: boolean;
};

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();
const show = useVModel(props, 'modelValue', emit);

const currForm = ref<AuthenticationForm>('auth');
const currTitle = ref<AuthenticationLabel>('Вход');

type FormLabels = {
    [K in AuthenticationForm]: AuthenticationLabel;
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

const showNext = (nextData: NextAuthForm) => {
    currForm.value = nextData.form;
    currTitle.value = formLabels[nextData.form];
    loginInfo.value = { ...nextData.data };
};
</script>

<template>
    <Modal v-model="show" size="sm" :title="currTitle">
        <template #default>
            <AuthForm @show-next="showNext" />
        </template>
    </Modal>
</template>
