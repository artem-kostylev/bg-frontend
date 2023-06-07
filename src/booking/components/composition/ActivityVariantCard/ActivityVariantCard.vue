<script setup lang="ts">
import type { IncludedActivity } from '@/booking/types';
import { Card, Typography, Button } from '@ui/components';
import { formatCurrency } from '@/app/lib';
import { useCompositionStore } from '@/booking/stores';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

type Props = {
    includedActivity: IncludedActivity;
};

const props = defineProps<Props>();

const compositionStore = useCompositionStore();
const { selectAllActivities } = compositionStore;
const { selectedAllActivities } = storeToRefs(compositionStore);

const onSelect = () => {
    selectAllActivities(props.includedActivity.all_activities);
};

const isSelected = computed(() => {
    return props.includedActivity.all_activities === selectedAllActivities.value;
});
</script>

<template>
    <Card :class="['text-center', isSelected && 'ring-2 ring-primary-500']">
        <Typography variant="h4" class="mb-2.5">{{ includedActivity.tour_name }}</Typography>
        <Typography>{{ includedActivity.tour_description }}</Typography>
        <template #footer>
            <Button variant="primary" block @click="onSelect">
                {{ formatCurrency(includedActivity.price) }}
            </Button>
        </template>
    </Card>
</template>
