<script setup lang="ts">
import { ref } from 'vue';
import { useNuxtData } from '#imports';
import type { Profile } from '@/account/types';
import { Input, Grid, RadioButtonGroup, Button } from '@ui/components';
import { updateProfile } from '@/account/services';
import { useMessage } from '@ui/composables';

const sexOptions = [
    { label: 'Мужской', value: true },
    { label: 'Женский', value: false },
];

const { data } = useNuxtData<Profile>('account-profile');
const message = useMessage();
const sending = ref(false);

const submit = async () => {
    if (!data.value) return;

    try {
        sending.value = true;
        await updateProfile(data.value);
        message.success('Информация успешно обновлена');
    } catch (error) {
        message.danger((error as Error).message);
    } finally {
        sending.value = false;
    }
};
</script>

<template>
    <div class="space-y-5" v-if="data">
        <Grid cols="4" gap="5">
            <Input v-model="data.last_name" label="Фамилия" />
            <Input v-model="data.first_name" label="Имя" />
            <Input v-model="data.second_name" label="Отчество" />
            <Input v-model="data.date_of_birth" label="Дата рождения" />
            <RadioButtonGroup v-model="data.sex" label="Пол" :options="sexOptions" />
        </Grid>
        <Button variant="primary" @click="submit" :loading="sending">Сохранить</Button>
    </div>
</template>
