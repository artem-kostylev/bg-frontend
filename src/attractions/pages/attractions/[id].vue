<script setup lang="ts">
import { definePageMeta, useLazyAsyncData } from '#imports';
import { useName, useParams } from '@/app/composables';
import { Page, DetailsHeader } from '@/app/components';
import { fetchAttraction } from '@/attractions/services';
import { Spin } from '@ui/components';
import { AttractionDescription, AttractionContainer } from '@/attractions/components';
import type { AttractionName } from '@/attractions/types';

definePageMeta({ filters: true });

const name = useName<AttractionName>();
const params = useParams<{ id: string }>();

const { data, pending } = useLazyAsyncData('attraction', () =>
    fetchAttraction(params.value.id, name.value)
);
</script>

<template>
    <Page :meta="data?.meta">
        <Spin v-if="pending" color="primary" class="flex-1" />
        <div v-else-if="data" class="space-y-6">
            <DetailsHeader :entity="data.entity" />
            <AttractionDescription
                v-if="data.entity.description"
                :description="data.entity.description"
            />
            <AttractionContainer
                v-if="name === 'locations-id' || name === 'attractions-id'"
                :location-id="data.entity.location_id"
                :attraction-name="name"
                :additional-description="data.entity.additional_description"
            />
        </div>
    </Page>
</template>
