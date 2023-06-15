<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue';
import { InputPassword, Button } from '@ui/components';
import { LockIcon } from '@ui/icons';
import { PasswordRequirements } from '@/auth/components';
import type { ResetForm, ResetErrors } from '@/auth/types';
import {
    required,
    minPassword,
    minOneDigit,
    upperAndLowerCase,
    minOneSpecialSymbol,
} from '@/app/lib';
import { helpers, sameAs } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useClearForm, useClearFieldErrors } from '@/auth/composables';

type Props = {
    pending?: boolean;
    isError?: boolean;
    errors?: ResetErrors | null;
};

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'submit', value: ResetForm): void;
    (e: 'clear-errors', value?: keyof ResetErrors): void;
}>();

const form = ref({
    password: '',
    password_confirmation: '',
});

const rules = computed(() => ({
    password: { required, minPassword, minOneDigit, upperAndLowerCase, minOneSpecialSymbol },
    password_confirmation: {
        required,
        sameAs: helpers.withMessage(
            'Введенные пароли должны совпадать',
            sameAs(form.value.password)
        ),
    },
}));

const v$ = useVuelidate(rules, form);

const showTip = ref(false);

const onSubmit = async () => {
    if (!(await v$.value.$validate())) return;
    emit('submit', form.value);
};

const clearFieldError = (key: string) => {
    emit('clear-errors', key as keyof ResetErrors);
};

useClearFieldErrors({
    form,
    errors: props.errors as { [key: string]: string[] | undefined },
    clearFieldError,
});

onBeforeUnmount(() => {
    useClearForm(form);
    emit('clear-errors');
});
</script>

<template>
    <div class="space-y-4">
        <InputPassword
            v-model="v$.password.$model"
            name="password"
            placeholder="Новый пароль"
            :error="v$.password.$errors[0]?.$message || (errors?.password && errors.password[0])"
            :success="v$.password.$model !== '' && v$.password.$errors.length === 0"
            :start-icon="LockIcon"
        />
        <InputPassword
            v-model="v$.password_confirmation.$model"
            name="password_confirmation"
            placeholder="Пароль еще раз"
            :error="
                v$.password_confirmation.$errors[0]?.$message ||
                (errors?.password_confirmation && errors.password_confirmation[0])
            "
            :success="
                v$.password_confirmation.$model !== '' &&
                v$.password_confirmation.$errors.length === 0
            "
            :start-icon="LockIcon"
        />
        <PasswordRequirements v-model="showTip" />
        <div class="flex justify-center mt-2.5">
            <Button variant="primary" :loading="pending" :disabled="isError" @click="onSubmit"
                >Сохранить</Button
            >
        </div>
    </div>
</template>
