<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import { useLazyAsyncData, clearNuxtData } from '#imports';
import { Modal, Divider } from '@ui/components';
import { fetchActivity } from '@/booking/services';
import { Info, Order } from './components';
import type { AllActivity } from '@/booking/types';

type Props = {
    activity: AllActivity;
    withOrder?: boolean;
};

const props = defineProps<Props>();

const { data, pending, execute } = useLazyAsyncData(
    `activity-${props.activity.id}`,
    () => fetchActivity(props.activity.id),
    { server: false, immediate: false }
);

const open = () => !data.value && execute();

onBeforeUnmount(() => clearNuxtData(`activity-${props.activity.id}`));
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
                    <Order :activity="data.activity" :dates="activity.date" />
                </template>
            </div>
        </template>
    </Modal>
</template>
