<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue';
import { Input, InputPassword, Divider, Button } from '@ui/components';
import { UserIcon, AtSignIcon, MobilePhoneIcon, LockIcon } from '@ui/icons';
import type { LoginInfo, RegisterForm, RegisterErrors } from '@/auth/types';
import { useVuelidate } from '@vuelidate/core';
import {
    required,
    firstNameLength,
    lastNameLength,
    secondNameLength,
    email,
    maskedPhoneNumber,
    minPassword,
    minOneDigit,
    upperAndLowerCase,
    minOneSpecialSymbol,
} from '@/app/lib';
import { helpers, sameAs } from '@vuelidate/validators';
import { PasswordRequirements } from '../PasswordRequirements';
import { useClearForm, useUpperCase } from '@/auth/composables';
import { vMaska } from 'maska';

type Props = {
    loginInfo: LoginInfo;
    pending?: boolean;
    btnDisabled?: boolean;
    errors?: RegisterErrors | null;
};

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'submit', value: RegisterForm): void;
    (e: 'clear-errors', value?: keyof RegisterErrors): void;
}>();

const form = ref({
    first_name: '',
    last_name: '',
    second_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
});

const rules = computed(() => ({
    first_name: { required, firstNameLength },
    last_name: { required, lastNameLength },
    second_name: { secondNameLength },
    email: {
        email,
        requiredType: props.loginInfo.loginType === 'phone' ? required : '',
    },
    phone: {
        maskedPhoneNumber,
        requiredType: props.loginInfo.loginType === 'email' ? required : '',
    },
    password: {
        minPassword,
        minOneDigit,
        upperAndLowerCase,
        minOneSpecialSymbol,
        requiredType: props.loginInfo.loginType === 'email' ? required : '',
    },
    password_confirmation: {
        sameAs: helpers.withMessage(
            'Введенные пароли должны совпадать',
            sameAs(form.value.password)
        ),
        requiredType: props.loginInfo.loginType === 'email' ? required : '',
    },
}));

const v$ = useVuelidate(rules, form);

const clearFieldError = (key: string) => {
    emit('clear-errors', key as keyof RegisterErrors);
};

useUpperCase({
    form,
    upperCaseKeys: ['first_name', 'last_name', 'second_name'],
    errors: props.errors as { [key: string]: string[] | undefined },
    clearFieldError,
});

const onSubmit = async () => {
    if (!(await v$.value.$validate())) return;
    emit('submit', form.value);
};

onBeforeUnmount(() => {
    useClearForm(form);
    emit('clear-errors');
});
</script>

<template>
    <div class="space-y-4">
        <Input
            v-model="v$.last_name.$model"
            name="lastname"
            placeholder="Фамилия"
            :error="v$.last_name.$errors[0]?.$message"
            :start-icon="UserIcon"
        />
        <Input
            v-model="v$.first_name.$model"
            name="firstname"
            placeholder="Имя"
            :error="v$.first_name.$errors[0]?.$message"
            :start-icon="UserIcon"
        />
        <Input
            v-model="v$.second_name.$model"
            name="secondname"
            placeholder="Отчество"
            :error="v$.second_name.$errors[0]?.$message"
            :start-icon="UserIcon"
        />
        <Divider dashed />
        <Input
            v-if="loginInfo.loginType === 'phone'"
            v-model="v$.email.$model"
            name="email"
            placeholder="E-mail"
            :error="v$.email.$errors[0]?.$message"
            :start-icon="AtSignIcon"
        />
        <div v-else class="space-y-4">
            <Input
                v-model="v$.phone.$model"
                name="phone"
                placeholder="Мобильный телефон"
                :error="v$.phone.$errors[0]?.$message"
                :start-icon="MobilePhoneIcon"
                v-maska
                :data-maska="'+7 (###) ### ## ##'"
            />
            <Divider dashed />
            <InputPassword
                v-model="v$.password.$model"
                name="password"
                placeholder="Пароль"
                :error="v$.password.$errors[0]?.$message"
                :success="v$.password.$model !== '' && v$.password.$errors.length === 0"
                :start-icon="LockIcon"
            />
            <InputPassword
                v-model="v$.password_confirmation.$model"
                name="password_confirmation"
                placeholder="Пароль еще раз"
                :error="v$.password_confirmation.$errors[0]?.$message"
                :success="
                    v$.password_confirmation.$model !== '' &&
                    v$.password_confirmation.$errors.length === 0
                "
                :start-icon="LockIcon"
            />
            <PasswordRequirements />
        </div>
        <div class="flex justify-center mt-2.5">
            <Button variant="primary" :loading="pending" :disabled="btnDisabled" @click="onSubmit"
                >Сохранить</Button
            >
        </div>
    </div>
</template>
