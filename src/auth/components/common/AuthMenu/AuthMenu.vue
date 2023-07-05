<script setup lang="ts">
import { Avatar, Dropdown } from '@ui/components';
import { useAuthStore } from '@/auth/stores';
import type { StringOrNumber } from '@ui/types';
import { useRouter } from 'vue-router';
import { fetchLogout } from '@/auth/services';

const options = [
    { label: 'Персональная информация', value: '/account/profile' },
    { label: 'Документы туристов', value: '/account/documents' },
    { label: 'Мои поездки', value: '/account/orders' },
    { label: 'Мои отзывы', value: '/account/reviews' },
    { label: 'Обратная связь', value: '/account/support' },
    { label: 'Выход', value: '/' },
];

const router = useRouter();
const authStore = useAuthStore();
const { user, setAccessToken, setUser } = authStore;

const logout = async () => {
    await fetchLogout();
    setAccessToken(null);
    setUser(null);
};

const select = async (value?: StringOrNumber | StringOrNumber[]) => {
    value === '/' && (await logout());
    router.push(value as string);
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
