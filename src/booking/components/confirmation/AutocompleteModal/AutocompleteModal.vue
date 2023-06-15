<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import { Button, Modal, Alert } from '@ui/components';
import { useLazyAsyncData, clearNuxtData } from '#imports';
import { fetchDocuments } from '@/account/services';
import type { Document } from '@/account/types';
// import type { FetchConfirmationResponse } from '@/booking/services';

// const { data: confirmation } = useNuxtData<FetchConfirmationResponse>('booking-confirmation');

// const ids = computed(() =>
//     confirmation.value!.accommodations.map(accommodation => accommodation.location[0].id)
// );

const { data, pending, execute } = useLazyAsyncData('documents', () => fetchDocuments(), {
    immediate: false,
});

const show = ref(false);

const open = () => !data.value && execute();

const emit = defineEmits<{ (e: 'complete', document: Document): void }>();

const choose = (doc: Document) => {
    emit('complete', doc);
    show.value = false;
};

onBeforeUnmount(() => clearNuxtData('documents'));
</script>

<template>
    <Modal v-model="show" :loading="pending" @open="open" title="Автозаполнение анкеты">
        <template #trigger="{ vbind }">
            <Button v-bind="vbind" variant="secondary">Автозаполнение</Button>
        </template>
        <div>
            <div class="grid" v-if="data?.length">
                <div
                    class="cursor-pointer text-primary-500 hover:text-primary-600 w-full border-b last:border-b-0 border-secondary-300 border-dashed py-2.5 first:pt-0 last:pb-0"
                    v-for="doc in data"
                    :key="doc.id"
                    @click="choose(doc)"
                >
                    {{ doc.name }} ({{ doc.document_number }})
                </div>
            </div>
            <div v-else>
                <Alert type="error" text="Документы не найдены" />
            </div>
        </div>
    </Modal>
</template>
