<script setup lang="ts">
import { useLazyAsyncData } from '#imports';
import { fetchNavigation } from '@/app/services';
import { useQuery, useName, useParams } from '@/app/composables';
import type { FiltersRaw } from '@/app/types';

const name = useName<string>();
const params = useParams<{ id: string }>();
const query = useQuery<FiltersRaw>();

const { data } = useLazyAsyncData(
    'navigation',
    () => fetchNavigation(name.value, params.value, query.value),
    { server: false }
);
</script>

<template>
    <div>
        <div
            v-for="(item, index) in data"
            :key="index"
            :class="item.is_current && 'text-primary-500'"
        >
            {{ item.name }}
        </div>
    </div>
</template>
