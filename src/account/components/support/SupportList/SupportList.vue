<script setup lang="ts">
import { ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { useLazyAsyncData, watch } from '#imports';
import { Spin } from '@ui/components';
import { getSupportList } from '@/account/services';
import DesktopList from './DesktopList.vue';
import MobileList from './MobileList.vue';

type Props = {
    success?: boolean;
};

const props = defineProps<Props>();

const page = ref(1);
const loadingMore = ref(false);

const { data, pending, execute } = useLazyAsyncData(
    'support-list',
    () => getSupportList(page.value),
    {
        server: false,
    }
);

const emit = defineEmits<{ (e: 'update'): void }>();

watch(
    () => props.success,
    async value => {
        if (value) {
            page.value = 1;
            await execute();
            emit('update');
        }
    }
);

const target = ref<HTMLDivElement | null>(null);

useIntersectionObserver(target, async ([{ isIntersecting }]) => {
    if (isIntersecting && data.value) {
        loadingMore.value = true;

        const response = await getSupportList(++page.value);
        data.value.meta = response.meta;
        data.value.data = data.value.data.concat(response.data);

        loadingMore.value = false;
    }
});
</script>

<template>
    <div>
        <div v-if="data?.data.length" class="text-2xl mb-3 sm:mb-4">Список обращений</div>
        <div v-if="pending" class="flex items-center justify-center py-10">
            <Spin width="2.4em" height="2.4em" class="text-primary-500" />
        </div>
        <div v-else-if="data?.data.length" class="mb-5">
            <DesktopList :appeals="data.data" class="hidden sm:block" />
            <MobileList :appeals="data.data" class="block sm:hidden" />
            <div v-if="page < data.meta.pagination.total_pages && !loadingMore" ref="target"></div>
        </div>
    </div>
</template>
