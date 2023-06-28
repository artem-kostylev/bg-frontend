<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, sameAs } from '@vuelidate/validators';
import { InputPassword, Button, Typography } from '@ui/components';
import { updatePassword } from '@/account/services';
import { useMessage } from '@ui/composables';
import {
    required,
    minPassword,
    minOneDigit,
    upperAndLowerCase,
    minOneSpecialSymbol,
} from '@/app/lib';
import { FetchError } from 'ofetch';

type Errors = {
    current_password: string[];
    new_password: string[];
    new_password_confirmation: string[];
};

const message = useMessage();
const sending = ref(false);
const errors = ref<Errors | null>(null);

const form = reactive({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
});

const rules = {
    current_password: {
        required,
        minPassword,
        minOneDigit,
        upperAndLowerCase,
        minOneSpecialSymbol,
    },
    new_password: {
        required,
        minPassword,
        minOneDigit,
        upperAndLowerCase,
        minOneSpecialSymbol,
    },
    new_password_confirmation: {
        sameAsPassword: helpers.withMessage(
            'Введенные пароли должны совпадать',
            sameAs(form.new_password)
        ),
    },
};

const v$ = useVuelidate(rules, form);

const submit = async () => {
    if (!(await v$.value.$validate())) return;

    try {
        sending.value = true;
        await updatePassword(form);
        message.success('Пароль успешно изменен');
        nextTick(() => v$.value.$reset());
    } catch (err) {
        if (err instanceof FetchError && err.status === 422 && err.data?.errors) {
            errors.value = err.data.errors;
        } else {
            message.danger((err as Error).message);
        }
    } finally {
        sending.value = false;
    }
};
</script>

<template>
    <div class="flex flex-col space-y-5">
        <Typography variant="h2" as="h2">Безопасность</Typography>
        <div class="w-full lg:w-1/4">
            <InputPassword
                autocomplete="off"
                v-model="v$.current_password.$model"
                label="Текущий пароль"
                :error="v$.current_password.$errors[0]?.$message || errors?.current_password?.[0]"
            />
        </div>
        <div class="w-full lg:w-1/4">
            <InputPassword
                v-model="v$.new_password.$model"
                label="Новый пароль"
                :error="v$.new_password.$errors[0]?.$message || errors?.new_password?.[0]"
            />
        </div>
        <div class="w-full lg:w-1/4">
            <InputPassword
                v-model="v$.new_password_confirmation.$model"
                label="Повторить новый пароль"
                :error="
                    v$.new_password_confirmation.$errors[0]?.$message ||
                    errors?.new_password_confirmation?.[0]
                "
            />
        </div>
        <div>
            <Button variant="primary" @click="submit" :loading="sending">Изменить</Button>
        </div>
    </div>
</template>
