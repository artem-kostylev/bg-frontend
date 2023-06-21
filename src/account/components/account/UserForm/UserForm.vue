<script setup lang="ts">
import { useNuxtData } from '#imports';
import type { Profile } from '@/account/types';
import { Input, Grid, RadioButtonGroup, Button } from '@ui/components';

const sexOptions = [
    { label: 'Мужской', value: 1 },
    { label: 'Женский', value: 0 },
];

const { data } = useNuxtData<Profile>('account-profile');
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
        <Button variant="primary">Сохранить</Button>
    </div>
</template>
