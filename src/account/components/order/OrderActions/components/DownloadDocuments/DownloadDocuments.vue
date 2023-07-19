<script setup lang="ts">
import { Button } from '@ui/components';
import { DownloadArrowIcon } from '@ui/icons';
import { useLazyAsyncData } from '#imports';
import { fetchOrderDocuments } from '@/account/services';

type Props = {
    orderId: number;
    href: string;
};

const props = defineProps<Props>();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data, pending } = useLazyAsyncData('order-documents', () =>
    fetchOrderDocuments(props.orderId)
);
</script>

<template>
    <a :href="href" download target="_blank" class="block w-full">
        <Button variant="secondary" :start-icon="DownloadArrowIcon" class="w-full sm:w-max">
            Сохранить все документы
        </Button>
    </a>
</template>
