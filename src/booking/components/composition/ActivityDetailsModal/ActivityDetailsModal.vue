<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import { Modal, Divider } from '@ui/components';
import { fetchActivity } from '@/booking/services';
import { useLazyAsyncData, clearNuxtData } from '#imports';
import { Info, Order } from './components';

type Props = {
    id: number;
    withOrder?: boolean;
};

const props = defineProps<Props>();

const { data, pending, execute } = useLazyAsyncData(
    `activity-${props.id}`,
    () => fetchActivity(props.id),
    { server: false, immediate: false }
);

const open = () => !data.value && execute();

onBeforeUnmount(() => clearNuxtData(`activity-${props.id}`));
</script>

<template>
    <Modal :loading="pending" @open="open" size="xl" :title="data?.activity.name">
        <template #trigger="{ vbind }">
            <slot name="trigger" :vbind="vbind" />
        </template>
        <template v-if="data">
            <div class="space-y-5">
                <Info :activity="data.activity" />
                <template v-if="withOrder">
                    <Divider dashed />
                    <Order :activity="data.activity" />
                </template>
            </div>
        </template>
    </Modal>
</template>
