<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onBeforeUnmount, ref, watch } from 'vue';
import { useLazyAsyncData, clearNuxtData } from '#imports';
import { CoveredModal, Divider } from '@ui/components';
import { fetchActivity } from '@/booking/services';
import { Info, Order } from './components';
import { useCompositionStore } from '@/booking/stores';

type Props = {
    withOrder?: boolean;
    id: number;
    dates?: string[];
};

const props = defineProps<Props>();
const show = ref(false);

const { selectedTickets } = storeToRefs(useCompositionStore());

const { data, pending, execute } = useLazyAsyncData(
    `activity-${props.id}`,
    () => fetchActivity(props.id),
    { server: false, immediate: false }
);

const open = () => !data.value && execute();

watch(selectedTickets, () => (show.value = false), { deep: true });

onBeforeUnmount(() => clearNuxtData(`activity-${props.id}`));
</script>

<template>
    <CoveredModal
        v-model="show"
        :loading="pending"
        @open="open"
        size="xl"
        :title="data?.activity.name"
        :cover="data?.activity.images[0].url"
    >
        <template #trigger="{ vbind }">
            <slot name="trigger" :vbind="vbind" />
        </template>
        <template v-if="data">
            <div class="space-y-5">
                <Info :activity="data.activity" />
                <template v-if="withOrder">
                    <Divider dashed />
                    <Order :activity="data.activity" :dates="dates!" />
                </template>
            </div>
        </template>
    </CoveredModal>
</template>
