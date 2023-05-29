<script setup lang="ts">
import { Button, Card, Typography } from '@ui/components';
import type { Period, PeriodItem } from '@/tours/types';
import { formatCurrency, formatDate } from '@/app/lib';
import { PeriodAvailableDurationModal } from '@/tours/components';
import { useQuery, useParams } from '@/app/composables';
import { useRouter } from 'vue-router';

type Props = {
    period: Period;
};

defineProps<Props>();
const query = useQuery();
const params = useParams<{ id: string }>();
const router = useRouter();

const onSelect = (item: PeriodItem) => {
    router.push({
        name: 'booking-composition',
        query: {
            ...query.value,
            ids: item.tour_id as never,
            tour_type: 'package',
            package_tour_id: params.value.id,
        },
    });
};
</script>

<template>
    <Card>
        <template #header>
            <Typography variant="h4" class="text-center">
                {{ formatDate(period.begin_date, 'day:numeric|month:long') }}
            </Typography>
        </template>
        <Button
            v-if="period.items.length === 1"
            @click="onSelect(period.items[0])"
            size="sm"
            variant="primary"
            block
        >
            от {{ formatCurrency(period.items[0].price) }}
        </Button>
        <PeriodAvailableDurationModal @select="onSelect" v-else :items="period.items">
            <template #trigger="{ vbind }">
                <Button v-bind="vbind" size="sm" variant="primary" block>
                    от {{ formatCurrency(period.items[0].price) }}
                </Button>
            </template>
        </PeriodAvailableDurationModal>
    </Card>
</template>
