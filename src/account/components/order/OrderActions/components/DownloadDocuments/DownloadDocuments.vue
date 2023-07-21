<script setup lang="ts">
import { useNuxtData } from '#imports';
import { Button } from '@ui/components';
import { DownloadArrowIcon } from '@ui/icons';

type Props = {
    orderNumber: number;
};

defineProps<Props>();

const { data } = useNuxtData<string | undefined>('order-documents');
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
