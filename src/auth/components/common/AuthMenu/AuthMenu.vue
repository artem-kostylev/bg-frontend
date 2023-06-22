<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Avatar, Dropdown } from '@ui/components';
import { useAuthStore } from '@/auth/stores';
import type { StringOrNumber } from '@ui/types';

const { user } = storeToRefs(useAuthStore());

const options = [
    { label: 'Персональная информация', value: 1 },
    { label: 'Документы туристов', value: 2 },
    { label: 'Мои поездки', value: 3 },
    { label: 'Мои отзывы', value: 4 },
    { label: 'Обратная связь', value: 4 },
    { label: 'Выход', value: 4 },
];

const select = (value?: StringOrNumber | StringOrNumber[]) => {
    // TODO FIX THIS
    // eslint-disable-next-line no-console
    console.log(value);
};
</script>

<template>
    <Dropdown :options="options" @select="select">
        <template #trigger="{ vbind }">
            <Avatar
                v-bind="vbind"
                width="2.4em"
                height="2.4em"
                :initials="user!.first_name + ' ' + user!.last_name"
                class="cursor-pointer"
            />
        </template>
    </Dropdown>
</template>
