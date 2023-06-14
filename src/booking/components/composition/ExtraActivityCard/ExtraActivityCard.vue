<script setup lang="ts">
import type { ExtraActivity } from '@/booking/types';
import { Card, Divider, Typography, Tooltip } from '@ui/components';
import { formatDate } from '@/app/lib';
import { ActivityDetailsModal } from '@/booking/components';
import { InfoIcon } from '@ui/icons';

type Props = {
    extraActivity: ExtraActivity;
};

defineProps<Props>();

const priceTypeName = {
    adult: 'Взрослый',
    child: 'Ребенок',
};
</script>

<template>
    <Card>
        <template #header>
            <div class="flex items-start justify-between space-x-5">
                <Typography variant="h3" class="mb-1">{{ extraActivity.name }}</Typography>
                <ActivityDetailsModal :id="extraActivity.id">
                    <template #trigger="{ vbind }">
                        <button v-bind="vbind" class="text-secondary-500">
                            <Tooltip text="Подробная информация">
                                <template #trigger="slotProps">
                                    <InfoIcon
                                        v-bind="slotProps.vbind"
                                        width="1.4em"
                                        height="1.4em"
                                    />
                                </template>
                            </Tooltip>
                        </button>
                    </template>
                </ActivityDetailsModal>
            </div>
            <Typography class="text-secondary-500">
                {{ formatDate(extraActivity.date, 'D MMM') }} в
                {{ extraActivity.time.slice(0, -3) }}
            </Typography>
        </template>
        <Divider class="mb-5" dashed />
        <div class="space-y-5">
            <div>
                <Typography variant="h5">Билеты:</Typography>
                <ul class="list-inside list-disc marker:text-secondary-400">
                    <li v-for="(ticket, index) in extraActivity.ticket" :key="index">
                        {{ priceTypeName[ticket.price_type] }} - {{ ticket.qty }}
                    </li>
                </ul>
            </div>
            <div>
                <Typography variant="h5">Дополнительно:</Typography>
                <Typography>{{ extraActivity.option }}</Typography>
            </div>
        </div>
    </Card>
</template>
