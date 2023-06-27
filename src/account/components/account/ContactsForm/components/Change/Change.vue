<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { useNuxtData } from '#imports';
import { Modal, Input, Button } from '@ui/components';
import { AtSignIcon, MobilePhoneIcon } from '@ui/icons';
import { email, maskedPhoneNumber, required } from '@/app/lib';
import { verifyPhoneOrEmail, updatePhoneOrEmail } from '@/account/services';
import { vMaska } from 'maska';
import { useMessage } from '@ui/composables';
import { FetchError } from 'ofetch';
import type { Profile } from '@/account/types';
import { Confirmation } from '@/app/components';

const { data } = useNuxtData<Profile>('account-profile');

type Props = {
    type: 'email' | 'phone';
};

const props = defineProps<Props>();

const form = reactive({
    value: '',
});

const code = ref('');
const show = ref(false);

const showCode = ref(false);
const sending = ref(false);
const message = useMessage();

const rules = computed(() => {
    return props.type === 'phone'
        ? { value: { required, maskedPhoneNumber } }
        : { value: { required, email } };
});

watch(code, async value => {
    if (value.length === 4) {
        try {
            await updatePhoneOrEmail({ [props.type]: form.value, code: value });
            show.value = false;
            data.value![props.type] = form.value;
            const text =
                props.type === 'phone'
                    ? 'Телефон успешно изменен'
                    : 'Электронная почта успешно изменина';

            message.success(text);
        } catch (error) {
            if (error instanceof FetchError) {
                message.danger(error.data.message);
            }
        }
    }
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
</script>

<template>
    <Modal
        v-model="show"
        :title="`Изменение ${type === 'phone' ? 'телефона' : 'электронной почты'}`"
        size="sm"
    >
        <template #trigger="{ vbind }">
            <Button v-bind="vbind">изменить</Button>
        </template>
        <Confirmation v-if="showCode">
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
                placeholder="Мобильный телефон"
            />
            <Input
                v-else
                v-model="v$.value.$model"
                :error="v$.value.$errors[0]?.$message"
                :start-icon="MobilePhoneIcon"
                v-maska
                :data-maska="'+7 (###) ### ## ##'"
                placeholder="Email"
            />
            <Button variant="primary" :loading="sending" block @click="sendEmail">
                Выслать код
            </Button>
        </div>
    </Modal>
</template>
