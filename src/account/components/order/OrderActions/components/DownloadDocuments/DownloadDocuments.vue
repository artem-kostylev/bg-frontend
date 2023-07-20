<script setup lang="ts">
import { Button } from '@ui/components';
import { DownloadArrowIcon } from '@ui/icons';
import { useLazyAsyncData } from '#imports';
import { fetchOrderDocuments } from '@/account/services';

type Props = {
    orderId: number;
    orderNumber: number;
    href: string;
};

const props = defineProps<Props>();

const { data } = useLazyAsyncData('order-documents', () => fetchOrderDocuments(props.orderId));
</script>

<template>
    <a
        v-if="data"
        :href="data"
        :download="`Документы по заказу №${orderNumber}.pdf`"
        class="block w-full"
    >
        <Button variant="secondary" :start-icon="DownloadArrowIcon" class="w-full sm:w-max">
            Сохранить все документы
        </Button>
    </a>
</template>
