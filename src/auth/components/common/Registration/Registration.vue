<script setup lang="ts">
import { ref } from 'vue';
import { Alert } from '@ui/components';
import { RegistrationForm } from './components';
import type { LoginInfo, RegisterForm as RegisterFormType } from '@/auth/types';

type Props = {
    loginInfo: LoginInfo;
};

defineProps<Props>();

const pending = ref(false);
const error = ref<string | null>(null);

// const showConfirmation = ref(false);
// const verifySent = ref(false);

const onSubmit = async (form: RegisterFormType) => {
    console.log('form', form);
};
</script>

<template>
    <div class="space-y-4">
        <Alert v-if="error" variant="error" :text="error" />
        <!-- <RegisterConfirmation
            v-if="showConfirmation"
            :verify-sent="verifySent"
            :login-info="loginInfo"
            @close="showConfirmation = false"
        /> -->
        <RegistrationForm :login-info="loginInfo" :pending="pending" @submit="onSubmit" />
    </div>
</template>
