<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
import type { IncludedActivity } from '@/booking/types';
import { useCompositionStore } from '@/booking/stores';
import { ActivityList, ActivityVariantList } from '@/booking/components';
import { Typography, Divider } from '@ui/components';

const compositionStore = useCompositionStore();
const { selectAllActivities } = compositionStore;
const { selectedAllActivities } = storeToRefs(compositionStore);

type Props = {
    includedActivities: IncludedActivity[];
};

const props = defineProps<Props>();

const type = computed(() => {
    const { includedActivities } = props;

    return includedActivities.length === 1
        ? includedActivities[0].all_activities.length
            ? 'activities'
            : 'basic'
        : 'options';
});

onMounted(() => {
    const { includedActivities } = props;
    type.value === 'activities' && selectAllActivities(includedActivities[0].all_activities);
});

const title = computed(() => {
    return type.value === 'activities' ? 'Чем заняться' : 'Варианты тура';
});
</script>

<template>
    <div v-if="type !== 'basic'" class="space-y-5">
        <div>
            <Typography variant="h2" as="h2" class="mb-1">{{ title }}</Typography>
            <Typography variant="description" v-if="type === 'activities'">
                Для этого тура можно выбрать дополнительные экскурсии:
            </Typography>
        </div>
        <ActivityVariantList
            v-if="includedActivities.length > 1"
            :included-activities="includedActivities"
        />
        <ActivityList v-if="selectedAllActivities.length" :activities="selectedAllActivities" />
        <Divider dashed />
    </div>
    <div v-if="type === 'basic' || selectedAllActivities.length">
        <slot name="footer" />
    </div>
</template>
