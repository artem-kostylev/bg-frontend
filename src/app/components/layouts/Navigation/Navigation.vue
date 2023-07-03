<script setup lang="ts">
import { computed } from 'vue';
import { useLazyAsyncData } from '#imports';
import { fetchNavigation } from '@/app/services';
import { useQuery, useName, useParams } from '@/app/composables';
import type { FiltersRaw, Navigation } from '@/app/types';
import { Container } from '@ui/components';
import { CheckIcon } from '@ui/icons';
import { formatFilters } from '~/lib';
import type { RouteLocationPathRaw, LocationQueryRaw } from 'vue-router';

const name = useName<string>();
const params = useParams<{ id: string }>();
const query = useQuery<FiltersRaw>();

const { data } = useLazyAsyncData(
    'navigation',
    () => fetchNavigation(name.value, params.value, query.value),
    { server: false, watch: [name, params, query] }
);

const currentIndex = computed(() => {
    if (!data.value) return -1;

    return data.value.findIndex(item => item.is_current);
});

const getTo = (item: Navigation) => {
    if (!item.route) return undefined;

    const payload = {} as RouteLocationPathRaw;
    payload.path = item.route.path;
    payload.query = formatFilters(item.route.query) as LocationQueryRaw;

    return payload;
};
</script>

<template>
    <Container
        class="flex w-full overflow-hidden overflow-x-auto space-x-5 pt-5 scrollbar-hidden"
        v-if="data"
    >
        <ol class="flex items-center whitespace-nowrap">
            <li v-for="(item, index) in data" :key="index">
                <NuxtLink :to="getTo(item)">
                    <div class="relative">
                        <div class="items-center flex inset-0 absolute">
                            <div
                                v-if="data.length - 1 !== index"
                                :class="[
                                    'w-full h-px border-t',
                                    index === currentIndex && 'border-secondary-200',
                                    index < currentIndex && 'border-primary-500',
                                    index > currentIndex && 'border-secondary-200',
                                ]"
                            ></div>
                        </div>
                        <div
                            :class="[
                                'flex relative w-6 h-6 items-center justify-center rounded-full border',
                                index === currentIndex && 'bg-white border-primary-500',
                                index < currentIndex && 'bg-primary-500 border-transparent',
                                index > currentIndex && 'bg-white border-secondary-300',
                            ]"
                        >
                            <CheckIcon
                                v-if="index < currentIndex"
                                width="0.8rem"
                                height="0.8rem"
                                class="text-white"
                            />
                            <span
                                :class="[
                                    'text-sm font-medium',
                                    index === currentIndex
                                        ? 'text-primary-500'
                                        : 'text-secondary-400',
                                ]"
                                v-else
                            >
                                {{ index + 1 }}
                            </span>
                        </div>
                    </div>
                    <div
                        :class="[
                            'pr-8 lg:pr-12 pt-2 text-sm font-medium',
                            ,
                            index < currentIndex && 'text-primary-500',
                            index > currentIndex && 'text-secondary-400',
                        ]"
                    >
                        {{ item.name }}
                    </div>
                </NuxtLink>
            </li>
        </ol>
    </Container>
</template>
