<script setup lang="ts">
import { Button, Input } from '@ui/components';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@/app/lib';
import { vMaska } from 'maska';
import type { QuestionnaryForm } from '@/booking/types';

type Props = {
    questionnary?: QuestionnaryForm;
};

const props = defineProps<Props>();

const emit = defineEmits<{ (e: 'submit'): void; (e: 'close'): void }>();

const rules = {
    last_name: { required },
    first_name: { required },
    phone: { required },
    email: { required, email },
};

// TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const v$ = useVuelidate(rules, props.questionnary as any);

const submit = async () => {
    if (!(await v$.value.$validate())) return;
    emit('submit');
};

const close = () => {
    emit('close');
};
</script>

<template>
    <div>
        <div class="flex flex-wrap -mx-2.5">
            <div class="w-full lg:w-1/2 px-2.5 mb-5">
                <Input
                    v-model="v$.last_name.$model"
                    required
                    name="lastname"
                    label="Фамилия"
                    :error="!!v$.last_name.$errors[0]"
                    :hint="String(v$.last_name.$errors[0]?.$message)"
                />
            </div>
            <div class="w-full lg:w-1/2 px-2.5 mb-5">
                <Input
                    v-model="v$.first_name.$model"
                    required
                    name="firstname"
                    label="Имя"
                    :error="!!v$.first_name.$errors[0]"
                    :hint="String(v$.first_name.$errors[0]?.$message)"
                />
            </div>
            <div class="w-full lg:w-1/2 px-2.5 mb-5">
                <Input
                    v-model="v$.phone.$model"
                    required
                    name="phone"
                    label="Мобильный телефон"
                    :error="!!v$.phone.$errors[0]"
                    :hint="String(v$.phone.$errors[0]?.$message)"
                    v-maska
                    :data-maska="'+7 (###) ### ## ##'"
                />
            </div>
            <div class="w-full lg:w-1/2 px-2.5 mb-5">
                <Input
                    v-model="v$.email.$model"
                    required
                    name="email"
                    label="Электронная почта"
                    :error="!!v$.email.$errors[0]"
                    :hint="String(v$.email.$errors[0]?.$message)"
                />
            </div>
        </div>
        <div class="flex space-x-2.5 justify-end">
            <Button @click="close">Отменить</Button>
            <Button :disabled="v$.$invalid" variant="primary" @click="submit">Сохранить</Button>
        </div>
    </div>
</template>
