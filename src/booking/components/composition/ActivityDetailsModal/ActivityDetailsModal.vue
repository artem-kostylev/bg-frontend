<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onBeforeUnmount, ref, watch } from 'vue';
import { useLazyAsyncData, clearNuxtData } from '#imports';
import { CoveredModal, Divider } from '@ui/components';
import { fetchActivity } from '@/booking/services';
import { Info, Order } from './components';
import type { AllActivity } from '@/booking/types';
import { useCompositionStore } from '@/booking/stores';

type Props = {
    activity: AllActivity;
    withOrder?: boolean;
};

const props = defineProps<Props>();
const show = ref(false);

const { selectedTickets } = storeToRefs(useCompositionStore());

const { data, pending, execute } = useLazyAsyncData(
    `activity-${props.activity.id}`,
    () => fetchActivity(props.activity.id),
    { server: false, immediate: false }
);

const open = () => !data.value && execute();

watch(selectedTickets, () => (show.value = false), { deep: true });

onBeforeUnmount(() => clearNuxtData(`activity-${props.activity.id}`));
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
                    <Order :activity="data.activity" :dates="activity.date" />
                </template>
            </div>
        </template>
    </CoveredModal>
</template>
