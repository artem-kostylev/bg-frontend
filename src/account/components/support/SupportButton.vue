<script setup lang="ts">
import { Button } from '@ui/components';
import { QuestionInCircleIcon } from '@ui/icons';
import { useRouter, useRoute } from '#imports';

type Props = {
    supportId?: number | null;
    orderNumber?: number;
};

const props = defineProps<Props>();

const router = useRouter();
const route = useRoute();

const toSupport = async () => {
    if (props.supportId) {
        await router.push({
            name: 'account-support-id',
            params: { id: props.supportId },
            query: route.query,
        });
    } else if (props.orderNumber) {
        await router.push({
            name: 'account-support',
            query: { ...route.query, order_number: props.orderNumber },
        });
    } else return;
};
</script>

<template>
    <Button
        :start-icon="QuestionInCircleIcon"
        variant="secondary"
        icon-class="w-5 h-5"
        @click="toSupport"
    >
        {{ supportId ? 'Общение с поддержкой' : 'Обращение в поддержку' }}
    </Button>
</template>
