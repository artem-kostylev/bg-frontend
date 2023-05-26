<script setup lang="ts">
import type { Accommodation } from '@/booking/types';
import { Divider, Grid } from '@ui/components';
import { AccommodationCard } from '@/booking/components';

type Props = {
    variant: 'composition' | 'booking' | 'extras' | 'order' | 'pay';
    data: Accommodation[];
    noShadow?: boolean;
};

defineProps<Props>();

const emit = defineEmits<{
    (
        e: 'submit',
        value: {
            id: number;
            // TODO
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            selectedItems: any[];
            accommodationIndex: number;
            roomIndex: number;
        }
    ): void;
}>();

const submit = ({
    id,
    selectedItems,
    accommodationIndex,
    roomIndex,
}: {
    id: number;
    // TODO
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedItems: any[];
    accommodationIndex: number;
    roomIndex: number;
}) => {
    emit('submit', { id, selectedItems, accommodationIndex, roomIndex });
};
</script>

<template>
    <Grid cols="3" gap="5">
        <div v-for="(accommodation, index) in data" :key="accommodation.id" class="w-full">
            <AccommodationCard
                :variant="variant"
                :accommodation="accommodation"
                :accommodation-index="index"
                :accommodation-length="data.length"
                :no-shadow="noShadow"
                @submit="submit"
            />
            <Divider v-if="index + 1 !== data.length" dashed class="mt-10 mb-8" />
        </div>
    </Grid>
</template>
