<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { ExcursionCard, OptionalExcursionsCard } from '@/booking/components';
import type { IncludedActivity } from '@/booking/types';
import { useCompositionStore } from '@/booking/stores';
import { useToursStore } from '@/tours/stores';
import { Typography } from '@ui/components';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
watch(props.includedActivities, (value: any) => {
    if (type.value === 'activities') {
        compositionStore.selectedAllActivities = value;
    }
});

const selectedActivities = computed(() => compositionStore.selectedAllActivities);

const isExtraActivities = computed(() => {
    const { includedActivities } = props;

    if (includedActivities?.length === 1) {
        return includedActivities[0].all_activities.some(
            (obj: { status: string }) => obj.status === 'additionally'
        );
    } else return false;
});

onMounted(() => {
    const { includedActivities } = props;
    type.value === 'activities' && selectAllActivities(includedActivities[0].all_activities);
});
</script>

<template>
    <Typography v-if="type !== 'basic'" variant="h2" as="h2" class="mb-4">
        {{ type === 'activities' ? 'Чем заняться' : 'Варианты тура' }}
    </Typography>

    <div class="grid md:grid-cols-2 gap-5">
        <div v-if="type === 'options'">
            <ExcursionCard
                v-for="(activity, index) in includedActivities"
                :key="index"
                :activity="activity"
                :index="index"
                :class="currTourIndex === index && 'border-3 border-green-600/40'"
            />
        </div>
    </div>
    <div v-if="selectedActivities && selectedActivities.length">
        <div v-if="isExtraActivities" class="font-bold mb-4">
            Для этого тура можно выбрать дополнительные экскурсии:
        </div>
        <div class="flex md:flex-wrap overflow-x-auto scrollbar-hidden -mx-2.5 py-2">
            <div
                class="w-10/11 flex-shrink-0 md:w-1/2 lg:w-1/3 px-2.5 mb-4"
                v-for="(activity, index) in selectedActivities"
                :key="activity.id"
            >
                <OptionalExcursionsCard :activity="activity" :activity-index="index" />
            </div>
        </div>
    </div>
</template>
