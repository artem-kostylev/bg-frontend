<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import { Button, Modal } from '@ui/components';
import { useLazyAsyncData, clearNuxtData } from '#imports';
import { fetchDocuments } from '@/account/services';
// import type { FetchConfirmationResponse } from '@/booking/services';

// const { data: confirmation } = useNuxtData<FetchConfirmationResponse>('booking-confirmation');

// const ids = computed(() =>
//     confirmation.value!.accommodations.map(accommodation => accommodation.location[0].id)
// );

const { data, pending, execute } = useLazyAsyncData('documents', () => fetchDocuments(), {
    immediate: false,
});

const open = () => !data.value && execute();

onBeforeUnmount(() => clearNuxtData('documents'));
</script>

<template>
    <Modal :loading="pending" @open="open" title="Автозаполнение анкеты">
        <template #trigger="{ vbind }">
            <Button v-bind="vbind" variant="secondary">Автозаполнение</Button>
        </template>
        <div>{{ data }}</div>
    </Modal>
</template>
