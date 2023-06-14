<script setup lang="ts">
import { computed } from 'vue';
import { Button, CollapseTransition } from '@ui/components';
import { SmallArrowIcon } from '@ui/icons';
import type { LoginInfo } from '@/auth/types';
import { phoneMask } from '@/app/lib/helpers';

type Props = {
    modelValue: boolean;
    loginInfo: LoginInfo;
    error: boolean;
    pending: boolean;
};

const props = defineProps<Props>();

const tipLabel = computed(() => {
    const passwordTip = props.error ? 'Вы ввели некорректный пароль. ' : '';
    return `${passwordTip}Для восстановления пароля мы вышлем код на `;
});

const emit = defineEmits<{
    (e: 'reset-password'): void;
    (e: 'update:modelValue', value: boolean): void;
}>();

const toggle = () => {
    emit('update:modelValue', !props.modelValue);
};
</script>

<template>
    <div>
        <Button
            variant="ghost"
            @click="toggle"
            :end-icon="SmallArrowIcon"
            :icon-class="modelValue ? 'w-3 transform rotate-180' : 'w-3'"
            >Восстановление пароля</Button
        >
        <CollapseTransition :show="modelValue">
            <div class="mt-2.5">
                <div class="mt-5">
                    {{ tipLabel }}
                    <span v-if="loginInfo.loginValue" class="font-semibold">{{
                        loginInfo.loginType === 'email'
                            ? loginInfo.loginValue
                            : phoneMask.masked(loginInfo.loginValue)
                    }}</span>
                </div>
                <div class="flex justify-center mt-2.5">
                    <Button variant="secondary" :loading="pending" @click="emit('reset-password')"
                        >Выслать код</Button
                    >
                </div>
            </div>
        </CollapseTransition>
    </div>
</template>
