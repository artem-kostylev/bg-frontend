<script setup lang="ts">
import { useLazyAsyncData } from '#imports';
import { useQuery } from '@/app/composables';
import type { FetchTourPackageWithPeriodsQuery } from '@/tours/services';
import { fetchTourPackageWithPeriods } from '@/tours/services';
import { Page } from '@/app/components';
import { Spin, Typography } from '@ui/components';
import { PackageDetails, PeriodList } from '@/tours/components';

type Props = {
    id: string | number;
};
const props = defineProps<Props>();
const query = useQuery<FetchTourPackageWithPeriodsQuery>();

const { data, pending } = useLazyAsyncData('tour-package', () =>
    fetchTourPackageWithPeriods(props.id, query.value)
);
</script>

<template>
    <Page :meta="data?.meta">
        <Spin v-if="pending" color="primary" />
        <template v-else-if="data">
            <PackageDetails :package="data.package" class="mb-5" />
            <Typography variant="h2" as="h2" class="mb-5">Выбор периода</Typography>
            <PeriodList :periods="data.dates" />
        </template>
    </Page>
</template>
