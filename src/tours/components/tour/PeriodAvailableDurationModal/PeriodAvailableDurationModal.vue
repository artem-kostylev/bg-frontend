<script setup lang="ts">
import type { PeriodItem } from '@/tours/types';
import { Modal, Button, Divider, Grid } from '@ui/components';
import { formatCurrency } from '@/app/lib';

type Props = {
    items: PeriodItem[];
};

defineProps<Props>();
const emit = defineEmits<{ (e: 'select', value: PeriodItem): void }>();

const onSelect = (item: PeriodItem) => emit('select', item);
</script>

<template>
    <Modal title="Выбор длительности">
        <template #trigger="{ vbind }">
            <slot name="trigger" :vbind="vbind" />
        </template>
        <Grid gap="2.5">
            <template v-for="(item, index) in items" :key="index">
                <Divider v-if="index !== 0" dashed />
                <div class="flex items-center justify-between">
                    <div>Количество ночей: {{ item.duration }}</div>
                    <Button variant="primary" size="sm" @click="onSelect(item)">
                        от {{ formatCurrency(item.price) }}
                    </Button>
                </div>
            </template>
        </Grid>
    </Modal>
</template>
