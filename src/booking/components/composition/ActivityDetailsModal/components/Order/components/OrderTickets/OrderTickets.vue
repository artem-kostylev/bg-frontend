<script setup lang="ts">
import { ref } from 'vue';
import { formatCurrency } from '@/app/lib';
import type { ActivityDetail, ActivitySearchTicket } from '@/booking/types';
import { QuantityPicker, Typography, Button } from '@ui/components';
import { useCompositionStore } from '@/booking/stores';
import { computed } from 'vue';

type Props = {
    id: number;
    tickets: ActivitySearchTicket[];
    activity: ActivityDetail;
};

const props = defineProps<Props>();

const { addTickets } = useCompositionStore();
const values = ref({} as Record<string, number>);

const canSubmit = computed(() => {
    return !!Object.keys(values.value).length;
});

const onSubmit = () => {
    if (!canSubmit.value) return;

    const price = props.tickets.reduce((prev, curr) => {
        if (values.value[curr.key]) {
            prev += values.value[curr.key] * curr.price;
        }

        return prev;
    }, 0);

    addTickets(props.activity.id, { id: props.id, ...values.value, price });
};
</script>

<template>
    <div class="space-y-2.5 bg-secondary-100 p-5 rounded-xl">
        <div
            class="flex items-center justify-between space-x-5"
            v-for="ticket in tickets"
            :key="ticket.key"
        >
            <div class="flex items-center space-x-2.5">
                <Typography>{{ ticket.label }}</Typography> <span>-</span>
                <Typography variant="h5">{{ formatCurrency(ticket.price) }}</Typography>
            </div>
            <QuantityPicker v-model="values[ticket.key]" :min="ticket.min" :max="ticket.max" />
        </div>
    </div>
    <Button variant="primary" block @click="onSubmit" :disabled="!canSubmit">Добавить</Button>
</template>
