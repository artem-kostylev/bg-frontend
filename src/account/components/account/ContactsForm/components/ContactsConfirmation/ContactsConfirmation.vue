<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useNuxtData } from '#imports';
import { Modal, Alert, Button } from '@ui/components';
import { CheckInCircleIcon } from '@ui/icons';
import { fetchVerifyCheck } from '@/auth/services';
import { useMessage } from '@ui/composables';
import type { Profile } from '@/account/types';
import { unmaskPhone } from '@/app/lib';
import { Confirmation } from '@/app/components';
import type { ConfirmError } from '@/auth/types';
import { useRequestStatus, useVerify } from '@/auth/composables';
import { phoneMask } from '@/app/lib/helpers';

const { data } = useNuxtData<Profile>('account-profile');

type Props = {
    type: 'email' | 'phone';
};

const props = defineProps<Props>();

const show = ref(false);

const loginInfo = computed(() => {
    const loginValue =
        typeof data.value![props.type] === 'number'
            ? data.value![props.type].toString()
            : props.type === 'phone'
            ? unmaskPhone(data.value![props.type])
            : data.value![props.type];

    return {
        loginType: props.type,
        loginValue,
        isVerified: false,
    };
});

const loginLabel = computed(() => {
    return loginInfo.value.loginType === 'email'
        ? loginInfo.value.loginValue
        : phoneMask.masked(loginInfo.value.loginValue);
});

const sending = ref(false);
const sendError = ref<string | null>(null);
const { showConfirmation, verifySent, verify } = useVerify(loginInfo.value, sending, sendError);

const sendEmail = async () => {
    await verify();
};

const message = useMessage();
const { pending, error, clearErrors } = useRequestStatus({});

const submit = async (code: string) => {
    try {
        clearErrors();
        pending.value = true;

        const login = loginInfo.value;
        props.type === 'phone' && (login.loginValue = unmaskPhone(login.loginValue));

        await fetchVerifyCheck(code, login);

        show.value = false;
        const text =
            props.type === 'phone'
                ? 'Телефон успешно подтвержден'
                : 'Электронная почта успешно подтверждена';

        message.success(text);
    } catch (e) {
        const err = e as ConfirmError;

        if (err.status === 422 && err.data.errors?.code?.length) {
            error.value = err.data.errors.code[0];
        } else {
            error.value = 'Неизвестная ошибка';
        }
    } finally {
        pending.value = false;
    }
};

watch(show, value => {
    if (!value) {
        showConfirmation.value = false;
        verifySent.value = false;
        sendError.value = null;
        clearErrors();
    }
});
</script>

<template>
    <Modal
        v-model="show"
        :title="`Подтверждение ${type === 'phone' ? 'телефона' : 'электронной почты'}`"
        size="sm"
    >
        <template #trigger="{ vbind }">
            <Button
                v-bind="vbind"
                variant="ghost"
                :start-icon="CheckInCircleIcon"
                class="!text-black mt-2 sm:mt-0 sm:mb-2"
            >
                Подтвердить
            </Button>
        </template>
        <Confirmation
            v-if="showConfirmation"
            :error="error"
            :input-disabled="pending || !verifySent"
            @submit="submit"
        >
            <template #label>
                <div>
                    Введите код, высланный Вам на
                    <span class="font-medium">{{ loginLabel }}</span>
                </div>
            </template>
        </Confirmation>
        <div class="space-y-5" v-else>
            <Alert v-if="sendError" variant="error" :text="sendError" />
            <div>
                Для подтверждения
                {{ type === 'phone' ? 'номера телефона' : 'электронной почты' }} мы вышлем код на
                <span class="font-medium">{{ loginLabel }}</span>
            </div>
            <Button variant="primary" :loading="sending" block @click="sendEmail">
                Выслать код
            </Button>
        </div>
    </Modal>
</template>
