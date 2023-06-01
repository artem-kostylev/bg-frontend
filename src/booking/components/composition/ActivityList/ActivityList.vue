<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { ActivityCard } from '@/booking/components';
import type { IncludedActivity } from '@/booking/types';
import { useCompositionStore } from '@/booking/stores';

const compositionStore = useCompositionStore();
const { selectAllActivities } = compositionStore;

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
</script>

<template>
    <div>{{ type }}</div>

    <ActivityCard
        v-for="(activity, index) in includedActivities"
        :key="index"
        :activity="activity"
        :index="index"
    />
</template>
