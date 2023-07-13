<script setup lang="ts">
import { useLazyAsyncData, computed } from '#imports';
import { useQuery, useName } from '@/app/composables';
import type { FetchTourPackageWithHotelsQuery } from '@/tours/services';
import { fetchTourPackageWithHotels } from '@/tours/services';
import { Page } from '@/app/components';
import { Spin, Typography } from '@ui/components';
import { formatFilters } from '@/app/lib';
import { PackageDetails, TourList } from '@/tours/components';

type Props = {
    id: string | number;
};

const props = defineProps<Props>();
const name = useName<string>();
const query = useQuery<FetchTourPackageWithHotelsQuery>();

const { data, pending } = useLazyAsyncData('tour-package', () =>
    fetchTourPackageWithHotels(props.id, query.value)
);

const hotelNumber = computed(() => {
    const { accommodations_unikey } = query.value;

    if (!accommodations_unikey) return 1;
    return accommodations_unikey[0].length + 1;
});

const filters = computed(() => formatFilters(data.value!.filters));
</script>

<template>
    <Page :meta="data?.meta">
        <Spin class="flex-1" v-if="pending" color="primary" />
        <template v-else-if="data">
            <PackageDetails v-if="hotelNumber === 1" :package="data.package" class="mb-5" />
            <Typography variant="h2" as="h2" class="mb-5">
                Выбор отеля № {{ hotelNumber }}</Typography
            >
            <TourList :filters="filters" :name="name" :tours="data.tours" />
        </template>
    </Page>
</template>
