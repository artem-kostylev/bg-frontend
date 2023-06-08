<script setup lang="ts">
import { ref, computed } from 'vue';
import { Confirmation } from '@/auth/components';
import type { LoginInfo } from '@/auth/types';
import { fetchVerifyCheck } from '@/auth/services';
import type { FetchVerifyCheckResponse } from '@/auth/services';
import { useAuthStore } from '@/auth/stores/auth';

type Props = {
    verifySent: boolean;
    loginInfo: LoginInfo;
};

const props = defineProps<Props>();

const label = computed(() => {
    const loginTypeText = props.loginInfo.loginType === 'email' ? 'на' : 'в СМС на';
    return `Введите код, высланный Вам ${loginTypeText}`;
});

const emit = defineEmits<{
    (e: 'change-login'): void;
    (e: 'close'): void;
}>();

const authStore = useAuthStore();
const { setUser, setAccessToken } = authStore;

const saveUser = (response: FetchVerifyCheckResponse) => {
    if (props.loginInfo.loginType === 'phone') {
        setUser(response.user);
        setAccessToken(response.token);
    }
};

const pending = ref(false);
const error = ref<string | null>(null);
const incorrectCode = ref(false);

type ConfirmError = {
    status: number;
    data: {
        errors: {
            code: string[];
        };
    };
};

const confirm = async (code: string) => {
    if (!props.verifySent) return;
    // emit('clear-errors');

    try {
        pending.value = true;
        const response = await fetchVerifyCheck(code, props.loginInfo);
        response && saveUser(response);

        emit('close');
        error.value = null;
        incorrectCode.value = false;
    } catch (e) {
        const err = e as ConfirmError;

        if (err.status === 422 && err.data?.errors?.code?.length) {
            incorrectCode.value = true;
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
</script>

<template>
    <Confirmation :error="error" :input-disabled="pending || !verifySent" @confirm="confirm">
        <template #label>
            <span>{{ label }}</span>
            <span class="font-semibold">
                {{ loginInfo.loginValue }}
            </span>
        </template>
        <template #error>
            <div v-if="incorrectCode">
                <span>Введите корректный код или</span>
                <button class="text-blue-700 cursor-pointer" @click="emit('change-login')">
                    {{ incorrectLabel }}
                </button>
            </div>
        </template>
    </Confirmation>
</template>
