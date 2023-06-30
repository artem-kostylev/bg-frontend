<script setup lang="ts">
import { useLazyAsyncData } from '#imports';
import { fetchNavigation } from '@/app/services';
import { useQuery, useName, useParams } from '@/app/composables';
import type { FiltersRaw } from '@/app/types';
import { Container } from '@ui/components';
import type { RouteLocationNamedRaw } from 'vue-router';

const name = useName<string>();
const params = useParams<{ id: string }>();
const query = useQuery<FiltersRaw>();

const { data } = useLazyAsyncData(
    'navigation',
    () => fetchNavigation(name.value, params.value, query.value),
    { server: false }
);

const getLink = (route: RouteLocationNamedRaw) => {
    return route;
};
</script>

<template>
    <Container class="flex w-full space-x-5 pt-5">
        <NuxtLink
            v-for="(item, index) in data"
            :key="index"
            :class="[item.is_current && 'text-primary-500']"
            :to="getLink(item.route)"
        >
            {{ item.name }}
        </NuxtLink>
    </Container>
</template>
