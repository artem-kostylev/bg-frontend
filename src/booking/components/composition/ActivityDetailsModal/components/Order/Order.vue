<script setup lang="ts">
import { ref } from 'vue';
import { useLazyAsyncData } from '#imports';
import { Typography, Spin } from '@ui/components';
import type { ActivityDetail, ActivitySearchFilters } from '@/booking/types';
import { fetchActivitySearch } from '@/booking/services';
import { OrderFitlers, OrderTickets } from './components';

type Props = {
    activity: ActivityDetail;
    dates: string[];
};

const props = defineProps<Props>();
const filters = ref<ActivitySearchFilters>({
    time: '',
    date: '',
    option: '',
});

const getActivitySearch = async () => {
    const response = await fetchActivitySearch(props.activity.id, props.dates, filters.value);

    response.filters.forEach(filter => {
        filters.value[filter.key] = filter.value;
    });

    return response;
};

const { data, pending, execute } = useLazyAsyncData(`activity-search`, getActivitySearch, {
    server: false,
});
</script>

<template>
    <div class="space-y-5">
        <Typography variant="h3">Заказ экскурсии</Typography>
        <Spin class="flex-1" v-if="pending" color="primary" />
        <template v-else-if="data">
            <OrderFitlers
                v-model="filters"
                @update:model-value="execute()"
                :filters="data.filters"
            />
            <OrderTickets
                :tickets="data.tickets"
                :id="data.activity_item_id"
                :activity="activity"
            />
        </template>
    </div>
</template>
