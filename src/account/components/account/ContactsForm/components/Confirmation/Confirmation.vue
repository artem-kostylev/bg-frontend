<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useNuxtData } from '#imports';
import { Modal, Input, Button } from '@ui/components';
import { verifyUserByCode, confirmationPhoneOrEmail } from '@/account/services';
import { vMaska } from 'maska';
import { useMessage } from '@ui/composables';
import { FetchError } from 'ofetch';
import type { Profile } from '@/account/types';
import { unmaskPhone } from '~/lib';

const { data } = useNuxtData<Profile>('account-profile');

type Props = {
    type: 'email' | 'phone';
};

const props = defineProps<Props>();

const code = ref('');
const show = ref(false);

const showCode = ref(false);
const sending = ref(false);
const message = useMessage();

const payload = computed(() => data.value![props.type]);

watch(code, async value => {
    if (value.length === 4) {
        try {
            await verifyUserByCode({ [props.type]: payload.value, code: code.value });

            show.value = false;

            const text =
                props.type === 'phone'
                    ? 'Телефон успешно подтвержден'
                    : 'Электронная почта успешно подтверждена';

            message.success(text);
        } catch (error) {
            if (error instanceof FetchError) {
                message.danger(error.data.message);
            }
        }
    }
});

const sendEmail = async () => {
    try {
        sending.value = true;

        await confirmationPhoneOrEmail({
            [props.type]: props.type === 'phone' ? unmaskPhone(payload.value) : payload.value,
        });
        showCode.value = true;
    } catch (error) {
        if (error instanceof FetchError) {
            message.danger(error.data.message);
        }
    } finally {
        sending.value = false;
    }
};
</script>

<template>
    <Modal
        v-model="show"
        :title="`Подтверждение ${type === 'phone' ? 'телефона' : 'электронной почты'}`"
        size="sm"
    >
        <template #trigger="{ vbind }">
            <Button v-bind="vbind">подтвердить</Button>
        </template>
        <div v-if="showCode" class="space-y-5">
            <div>
                Введите код, высланный Вам на
                <span class="font-medium">{{ payload }}</span>
            </div>
            <Input
                v-model="code"
                justify="center"
                placeholder="_ _ _ _"
                v-maska
                data-maska="####"
            />
        </div>
        <div class="space-y-5" v-else>
            <div>
                Для подтверждения
                {{ type === 'phone' ? 'номера телефона' : 'электронной почты' }} мы вышлем код на
                <span class="font-medium">{{ payload }}</span>
            </div>
            <Button variant="primary" :loading="sending" block @click="sendEmail">
                Выслать код
            </Button>
        </div>
    </Modal>
</template>
