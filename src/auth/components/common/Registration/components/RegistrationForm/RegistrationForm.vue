<script setup lang="ts">
import { ref, computed } from 'vue';
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
    textTransform,
} from '@/app/lib';
import { helpers, sameAs } from '@vuelidate/validators';
import { PasswordRequirements } from '@/auth/components';
import { vMaska } from 'maska';

type Props = {
    loginInfo: LoginInfo;
    pending?: boolean;
    isError?: boolean;
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
    first_name: { firstNameLength },
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

const upperCaseKeys = ['first_name', 'last_name', 'second_name'];

const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('clear-errors', target.id as keyof RegisterErrors);
    upperCaseKeys.includes(target.id) && (target.value = textTransform(target.value));
};

const showTip = ref(false);

const onSubmit = async () => {
    if (!(await v$.value.$validate())) return;
    emit('submit', form.value);
};
</script>

<template>
    <div class="space-y-4">
        <Input
            v-model="v$.last_name.$model"
            name="lastname"
            id="last_name"
            placeholder="Фамилия"
            :error="v$.last_name.$errors[0]?.$message || (errors?.last_name && errors.last_name[0])"
            :start-icon="UserIcon"
            @input="onInput"
        />
        <Input
            v-model="v$.first_name.$model"
            name="firstname"
            id="first_name"
            placeholder="Имя"
            :error="
                v$.first_name.$errors[0]?.$message || (errors?.first_name && errors.first_name[0])
            "
            :start-icon="UserIcon"
            @input="onInput"
        />
        <Input
            v-model="v$.second_name.$model"
            name="secondname"
            id="second_name"
            placeholder="Отчество"
            :error="
                v$.second_name.$errors[0]?.$message ||
                (errors?.second_name && errors.second_name[0])
            "
            :start-icon="UserIcon"
            @input="onInput"
        />
        <Divider dashed />
        <Input
            v-if="loginInfo.loginType === 'phone'"
            v-model="v$.email.$model"
            name="email"
            id="email"
            placeholder="E-mail"
            :error="v$.email.$errors[0]?.$message || (errors?.email && errors.email[0])"
            :start-icon="AtSignIcon"
            @input="onInput"
        />
        <div v-else class="space-y-4">
            <Input
                v-model="v$.phone.$model"
                name="phone"
                id="phone"
                placeholder="Мобильный телефон"
                :error="v$.phone.$errors[0]?.$message || (errors?.phone && errors.phone[0])"
                :start-icon="MobilePhoneIcon"
                v-maska
                :data-maska="'+7 (###) ### ## ##'"
                @input="onInput"
            />
            <Divider dashed />
            <InputPassword
                v-model="v$.password.$model"
                name="password"
                id="password"
                placeholder="Пароль"
                :error="
                    v$.password.$errors[0]?.$message || (errors?.password && errors.password[0])
                "
                :success="v$.password.$model !== '' && v$.password.$errors.length === 0"
                :start-icon="LockIcon"
                @input="onInput"
            />
            <InputPassword
                v-model="v$.password_confirmation.$model"
                name="password_confirmation"
                id="password_confirmation"
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
                @input="onInput"
            />
            <PasswordRequirements v-model="showTip" />
        </div>
        <div class="flex justify-center mt-2.5">
            <Button variant="primary" :loading="pending" :disabled="isError" @click="onSubmit"
                >Сохранить</Button
            >
        </div>
    </div>
</template>
