<script setup lang="ts">
import { computed, resolveComponent } from 'vue';
import type { RouteLocationNamedRaw } from 'vue-router';
import { useLazyAsyncData } from '#imports';
import { useQuery } from '@/app/composables';
import { Page } from '@/app/components';
import { Spin, Typography, Button, Divider, Grid } from '@ui/components';
import { fetchComposition, type FetchCompositionQuery } from '@/booking/services';
import { Selected, ActivityList } from '@/booking/components';

const query = useQuery<FetchCompositionQuery>();

const { data, pending } = useLazyAsyncData('booking-composition', () =>
    fetchComposition(query.value)
);

const meta = {
    title: 'Состав',
    description: 'Описание состава',
};

const NuxtLink = resolveComponent('NuxtLink');

const to = computed(() => {
    const to: RouteLocationNamedRaw = { query: { ...query.value } };

    to.name = 'booking-confirmation';

    return to;
});
</script>

<template>
    <Page :meta="meta">
        <Spin v-if="pending" color="primary" />
        <Grid gap="5" v-else-if="data">
            <Typography variant="h1" as="h1">Состав</Typography>
            <Selected v-bind="data" :default-open="true" />
            <template v-if="data.included_activities">
                <Typography variant="h2" as="h2">Чем заняться</Typography>
                <ActivityList :included-activities="data.included_activities" />
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
