<script setup lang="ts">
import { useLazyAsyncData } from '#imports';
import { useName, useParams } from '@/app/composables';
import { Page, DetailsHeader } from '@/app/components';
import { fetchAttraction } from '@/attractions/services';
import { Spin, Grid } from '@ui/components';
import { LocationDescription, LocationsContainer } from '@/attractions/components';

const name = useName<'locations-id' | 'attractions-id' | 'activities-id'>();
const params = useParams<{ id: string }>();

const { data, pending } = useLazyAsyncData('attraction', () =>
    fetchAttraction(params.value.id, name.value)
);
</script>

<template>
    <Page :meta="data?.meta">
        <Spin v-if="pending" color="primary" class="flex-1" />
        <Grid v-else-if="data" gap="6">
            <DetailsHeader :entity="data.entity" />
            <LocationDescription
                v-if="data.entity.description"
                :description="data.entity.description"
            />
            <LocationsContainer v-if="name === 'locations-id'" />
            <LocationDescription
                v-if="data.entity.additional_description"
                :description="data.entity.additional_description"
            />
        </Grid>
    </Page>
</template>
