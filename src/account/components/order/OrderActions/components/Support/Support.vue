<script setup lang="ts">
import type { Component } from 'vue';
import { Button } from '@ui/components';
import { QuestionInCircleIcon } from '@ui/icons';
import { useRouter, useRoute } from '#imports';

type Props = {
    orderNumber: number;
    supportId?: number | null;
    label?: string;
    icon?: Component;
};

const props = withDefaults(defineProps<Props>(), {
    supportId: null,
    label: undefined,
    icon: QuestionInCircleIcon,
});

const router = useRouter();
const route = useRoute();

// TODO: добавить автоматическую отправку запроса если переход был через "Помощь оператора"
const toSupport = () => {
    if (props.supportId) {
        router.push({
            name: 'account-support-id',
            params: { id: props.supportId },
            query: route.query,
        });
    } else if (props.orderNumber) {
        router.push({
            name: 'account-support',
            query: { ...route.query, order_number: props.orderNumber },
        });
    } else return;
};
</script>

<template>
    <Button
        variant="secondary"
        :start-icon="icon"
        icon-class="w-5 h-5"
        class="w-full sm:w-max"
        @click="toSupport"
    >
        <span v-if="label">{{ label }}</span>
        <span v-else> {{ supportId ? 'Общение с поддержкой' : 'Обращение в поддержку' }}</span>
    </Button>
</template>
