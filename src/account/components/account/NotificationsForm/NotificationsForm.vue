<script setup lang="ts">
import type { Profile } from '@/account/types';
import { Typography, Switch } from '@ui/components';
import { useNuxtData } from '#imports';
import { updateProfile } from '@/account/services';
import { useMessage } from '@ui/composables';

const { data } = useNuxtData<Profile>('account-profile');
const message = useMessage();

const submit = async () => {
    if (!data.value) return;

    try {
        await updateProfile(data.value);
        message.success('Информация успешно обновлена');
    } catch (error) {
        message.danger((error as Error).message);
    }
};
</script>

<template>
    <div v-if="data">
        <Typography variant="h2" as="h2" class="mb-5">Уведомления</Typography>
        <div class="flex space-x-1.5">
            <Switch v-model="data.subscribe" @update:model-value="submit" />
            <span>Получать рассылку Библио Глобус на почту</span>
        </div>
    </div>
</template>
