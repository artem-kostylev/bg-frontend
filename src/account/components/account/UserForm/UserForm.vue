<script setup lang="ts">
import { ref } from 'vue';
import { vMaska } from 'maska';
import { FetchError } from 'ofetch';
import { useNuxtData } from '#imports';
import type { Profile } from '@/account/types';
import { Input, Grid, RadioButtonGroup, Button } from '@ui/components';
import { updateProfile } from '@/account/services';
import { useMessage } from '@ui/composables';
import { textTransform } from '@/app/lib';

type ProfileErrors = {
    [k in keyof Profile]: string[];
};

const sexOptions = [
    { label: 'Мужской', value: true },
    { label: 'Женский', value: false },
];

const { data } = useNuxtData<Profile>('account-profile');
const message = useMessage();
const sending = ref(false);
const errors = ref<ProfileErrors | null>(null);

const submit = async () => {
    if (!data.value) return;

    try {
        sending.value = true;
        await updateProfile(data.value);
        message.success('Информация успешно обновлена');
    } catch (error) {
        if (error instanceof FetchError && error.status === 422 && error.data.errors) {
            errors.value = error.data.errors;
            message.danger('Ошибка. Проверьте корректность введенных данных');
        } else {
            message.danger('Неизвестная ошибка');
        }
    } finally {
        sending.value = false;
    }
};

const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    target.value = textTransform(target.value);
};
</script>

<template>
    <div class="space-y-5" v-if="data">
        <Grid cols="4" gap="5">
            <Input
                v-model="data.last_name"
                :error="errors?.last_name?.[0]"
                @input="onInput"
                label="Фамилия"
            />
            <Input
                v-model="data.first_name"
                @input="onInput"
                :error="errors?.first_name?.[0]"
                label="Имя"
            />
            <Input
                v-model="data.second_name"
                @input="onInput"
                :error="errors?.second_name?.[0]"
                label="Отчество"
            />
            <Input
                v-model="data.date_of_birth"
                label="Дата рождения"
                v-maska
                :data-maska="'##.##.####'"
            />
            <RadioButtonGroup v-model="data.sex" label="Пол" :options="sexOptions" />
        </Grid>
        <Button variant="primary" @click="submit" :loading="sending">Сохранить</Button>
    </div>
</template>
