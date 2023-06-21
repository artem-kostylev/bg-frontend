<script setup lang="ts">
import { useLazyAsyncData, definePageMeta } from '#imports';
import { fetchProfile } from '@/account/services';
import { Page } from '@/app/components';
import { Divider, Spin, Typography } from '@ui/components';
import { UserForm, ContactsForm, NotificationsForm } from '@/account/components';

definePageMeta({
    middleware: 'auth',
});

const { data, pending } = useLazyAsyncData('account-profile', () => fetchProfile());

const meta = {
    title: 'Персональная информация',
};
</script>

<template>
    <Page :meta="meta">
        {{ data }}
        <Spin v-if="pending" color="primary" />
        <div v-else-if="data" class="space-y-5">
            <Typography variant="h1" as="h1">Персональная информация</Typography>
            <UserForm />
            <Divider dashed />
            <ContactsForm />
            <Divider dashed />
            <NotificationsForm />
            <Divider dashed />
        </div>
    </Page>
</template>
