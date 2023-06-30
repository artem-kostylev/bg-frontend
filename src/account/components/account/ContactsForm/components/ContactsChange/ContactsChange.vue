<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { useNuxtData } from '#imports';
import { Modal, Input, Button } from '@ui/components';
import { AtSignIcon, MobilePhoneIcon, PenIcon } from '@ui/icons';
import { email, maskedPhoneNumber, required } from '@/app/lib';
import { verifyPhoneOrEmail, updatePhoneOrEmail } from '@/account/services';
import { vMaska } from 'maska';
import { useMessage } from '@ui/composables';
import { FetchError } from 'ofetch';
import type { Profile } from '@/account/types';
import type { ConfirmError } from '@/auth/types';
import { Confirmation } from '@/app/components';

const { data } = useNuxtData<Profile>('account-profile');

type Props = {
    type: 'email' | 'phone';
};

const props = defineProps<Props>();

const form = reactive({
    value: '',
});

const show = ref(false);

const showCode = ref(false);
const sending = ref(false);
const message = useMessage();

const rules = computed(() => {
    return props.type === 'phone'
        ? { value: { required, maskedPhoneNumber } }
        : { value: { required, email } };
});

const v$ = useVuelidate(rules, form);

const sendEmail = async () => {
    if (!(await v$.value.$validate())) return;

    try {
        sending.value = true;
        await verifyPhoneOrEmail({ [props.type]: form.value });
        showCode.value = true;
    } catch (error) {
        if (error instanceof FetchError) {
            message.danger(error.data.message);
        }
    } finally {
        sending.value = false;
    }
};

const error = ref<string | null>(null);

const submit = async (code: string) => {
    try {
        error.value = null;
        sending.value = true;
        await updatePhoneOrEmail({ [props.type]: form.value, code });
        show.value = false;
        data.value![props.type] = form.value;
        const text =
            props.type === 'phone'
                ? 'Телефон успешно изменен'
                : 'Электронная почта успешно изменина';

        message.success(text);
    } catch (e) {
        const err = e as ConfirmError;

        if (err.status === 422 && err.data?.errors?.code?.length) {
            error.value = err.data.errors.code[0];
        } else {
            error.value = 'Неизвестная ошибка';
        }
    } finally {
        sending.value = false;
    }
};
</script>

<template>
    <Modal
        v-model="show"
        :title="`Изменение ${type === 'phone' ? 'телефона' : 'электронной почты'}`"
        size="sm"
    >
        <template #trigger="{ vbind }">
            <Button
                v-bind="vbind"
                variant="ghost"
                :start-icon="PenIcon"
                class="!text-black mt-2 sm:mt-0 sm:mb-2"
            >
                Изменить
            </Button>
        </template>
        <Confirmation v-if="showCode" :error="error" :input-disabled="sending" @submit="submit">
            <template #label>
                <div>
                    Введите код, высланный Вам на <span class="font-medium">{{ form.value }}</span>
                </div>
            </template>
        </Confirmation>
        <div class="space-y-5" v-else>
            <div v-if="type === 'phone'">Мы вышлем код подтверждения на новый телефон</div>
            <div v-else>Мы вышлем код подтверждения на новую электронную почту</div>
            <Input
                v-if="type === 'email'"
                v-model="v$.value.$model"
                :error="v$.value.$errors[0]?.$message"
                :start-icon="AtSignIcon"
                placeholder="Email"
            />
            <Input
                v-else
                v-model="v$.value.$model"
                :error="v$.value.$errors[0]?.$message"
                :start-icon="MobilePhoneIcon"
                v-maska
                :data-maska="'+7 (###) ### ## ##'"
                placeholder="Мобильный телефон"
            />
            <Button variant="primary" :loading="sending" block @click="sendEmail">
                Выслать код
            </Button>
        </div>
    </Modal>
</template>
