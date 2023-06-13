<script setup lang="ts">
import { computed, resolveComponent } from 'vue';
import type { RouteLocationNamedRaw } from 'vue-router';
import { useLazyAsyncData } from '#imports';
import { useQuery } from '@/app/composables';
import { Page } from '@/app/components';
import { Spin, Typography, Button, Divider, Grid } from '@ui/components';
import { fetchComposition, type FetchCompositionQuery } from '@/booking/services';
import { Selected, ActivityContainer } from '@/booking/components';
import { useCompositionStore } from '@/booking/stores';
import { storeToRefs } from 'pinia';

const query = useQuery<FetchCompositionQuery>();

const { data, pending } = useLazyAsyncData('booking-composition', () =>
    fetchComposition(query.value)
);

const { selectedTickets } = storeToRefs(useCompositionStore());

const meta = {
    title: 'Состав',
    description: 'Описание состава',
};

const NuxtLink = resolveComponent('NuxtLink');

const to = computed(() => {
    const to: RouteLocationNamedRaw = { query: { ...query.value } };

    to.name = 'booking-confirmation';

    const values = Object.values(selectedTickets.value);

    to.query!.tickets = values.map(value => {
        const keys = Object.keys(value);
        keys.pop();

        return keys.map(key => `${key}:${value[key]}`).join('$');
    });

    to.query!.transfers = data.value?.transfers
        .filter(transfer => !!transfer.price)
        .map(transfer => transfer.id);

    return to;
});
</script>

<template>
    <Page :meta="meta">
        <Spin v-if="pending" color="primary" />
        <Grid gap="5" v-else-if="data">
            <Typography variant="h1" as="h1">Состав</Typography>
            <Selected v-bind="data" :default-open="true" />
            <template v-if="data.included_activities?.length">
                <ActivityContainer :included-activities="data.included_activities" />
                <Divider dashed />
            </template>
            <div>
                <Button :as="NuxtLink" :to="to" variant="primary" class="w-full md:w-auto">
                    Перейти к оформлению
                </Button>
            </div>
        </Grid>
    </Page>
</template>
