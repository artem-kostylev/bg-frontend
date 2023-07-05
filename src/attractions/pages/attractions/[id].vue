<script setup lang="ts">
import { useLazyAsyncData } from '#imports';
import { useName, useParams } from '@/app/composables';
import { Page, DetailsHeader } from '@/app/components';
import { fetchAttraction } from '@/attractions/services';
import { Spin } from '@ui/components';

const name = useName<'locations-id' | 'attractions-id' | 'activities-id'>();
const params = useParams<{ id: string }>();

const { data, pending } = useLazyAsyncData('attraction', () =>
    fetchAttraction(params.value.id, name.value)
);
</script>

<template>
    <Page :meta="data?.meta">
        <Spin class="flex-1" v-if="pending" color="primary" />
        <template v-else-if="data">
            <DetailsHeader :entity="data.entity" />
            <div
                v-if="data.entity.description"
                v-html="data.entity.description"
                class="prose max-w-none mt-6"
            />
        </template>
    </Page>
</template>
