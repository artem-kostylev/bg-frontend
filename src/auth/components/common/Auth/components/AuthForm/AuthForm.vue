<script setup lang="ts">
import { ref } from 'vue';
import { Button, Input } from '@ui/components';
import { useVuelidate } from '@vuelidate/core';
import { required, emailOrNumber } from '@/app/lib';

type Props = {
    error?: string | null;
    pending?: boolean;
    btnDisabled?: boolean;
};

defineProps<Props>();

const form = ref({
    login: '',
});

const rules = {
    login: {
        required,
        emailOrNumber,
    },
};

const v$ = useVuelidate(rules, form);

const emit = defineEmits<{
    (e: 'submit', value: string): void;
}>();

const onSubmit = async () => {
    if (!(await v$.value.$validate())) return;
    emit('submit', form.value.login);
};
</script>

<template>
    <div class="space-y-4">
        <Input
            v-model="v$.login.$model"
            name="login"
            placeholder="E-mail или Телефон"
            :error="v$.login.$errors[0]?.$message || error"
            @keyup.enter="onSubmit"
        />
        <div class="flex justify-center mt-2.5">
            <Button
                variant="primary"
                :loading="pending"
                :disabled="v$.$errors?.length > 0 || btnDisabled"
                @click="onSubmit"
                >Продолжить</Button
            >
        </div>
    </div>
</template>
