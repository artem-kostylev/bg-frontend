<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { ExcursionCard } from '@/booking/components';
import type { IncludedActivity } from '@/booking/types';
import { useCompositionStore } from '@/booking/stores';
import { useToursStore } from '@/tours/stores';

const compositionStore = useCompositionStore();
const { selectAllActivities } = compositionStore;

const toursStore = useToursStore();

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

const currTourIndex = computed(() => toursStore.currTourIndex);

onMounted(() => {
    const { includedActivities } = props;
    type.value === 'activities' && selectAllActivities(includedActivities[0].all_activities);
});
</script>

<template>
    <div>{{ type }}</div>

    <div class="grid md:grid-cols-2 gap-5">
        <ExcursionCard
            v-for="(activity, index) in includedActivities"
            :key="index"
            :activity="activity"
            :index="index"
            :class="currTourIndex === index && 'border-3 border-green-600/40'"
        />
    </div>
</template>
