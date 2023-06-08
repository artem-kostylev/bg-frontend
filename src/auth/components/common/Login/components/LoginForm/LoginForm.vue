<script setup lang="ts">
import { ref } from 'vue';
import { InputPassword, Button } from '@ui/components';
import { LockIcon } from '@ui/icons';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@/app/lib';

type Props = {
    error?: string | null;
    pending?: boolean;
    btnDisabled?: boolean;
};

defineProps<Props>();

const form = ref({
    password: '',
});

const rules = {
    password: {
        required,
    },
};

const v$ = useVuelidate(rules, form);

const emit = defineEmits<{
    (e: 'submit', value: string): void;
}>();

const onSubmit = async () => {
    if (!(await v$.value.$validate())) return;
    emit('submit', form.value.password);
};
</script>

<template>
    <div class="space-y-4">
        <InputPassword
            v-model="v$.password.$model"
            name="password"
            placeholder="Пароль"
            :error="v$.password.$errors[0]?.$message || error"
            :start-icon="LockIcon"
            @keyup.enter="onSubmit"
        />
        <div class="flex justify-center mt-5">
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
