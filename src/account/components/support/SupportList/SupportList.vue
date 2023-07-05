<script setup lang="ts">
import { ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { useLazyAsyncData, watch } from '#imports';
import { Spin, Typography } from '@ui/components';
import { getSupportList } from '@/account/services';
import DesktopList from './DesktopList.vue';
import MobileList from './MobileList.vue';
import { Empty } from '@/app/components';

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
        <Typography variant="h2" class="mb-5">Список обращений</Typography>
        <Spin v-if="pending" width="2.4em" height="2.4em" color="primary" />
        <div v-else-if="data?.data.length">
            <DesktopList :appeals="data.data" class="hidden sm:block" />
            <MobileList :appeals="data.data" class="block sm:hidden" />
            <div v-if="page < data.meta.pagination.total_pages && !loadingMore" ref="target"></div>
        </div>
        <Empty v-else title="У вас нет ни одного обращения" />
    </div>
</template>
