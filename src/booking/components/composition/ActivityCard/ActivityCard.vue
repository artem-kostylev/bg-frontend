<script setup lang="ts">
import { Card, Image, Typography, Tooltip, Button } from '@ui/components';
import type { AllActivity } from '@/booking/types';
import { ActivityDetailsModal } from '@/booking/components';
import { InfoIcon } from '@ui/icons';
import { formatCurrency } from '@/app/lib';

type Props = {
    activity: AllActivity;
};

defineProps<Props>();
</script>

<template>
    <Card cover-class="h-[14rem] bg-secondary-100">
        <template #cover>
            <Image
                :src="activity.image.url"
                :alt="activity.name"
                class="w-full h-full object-cover"
            />
        </template>
        <div class="flex items-start justify-between space-x-5">
            <Typography variant="h3" as="h3">{{ activity.name }}</Typography>
            <ActivityDetailsModal :id="activity.id">
                <template #trigger="{ vbind }">
                    <button v-bind="vbind" class="text-secondary-500">
                        <Tooltip text="Подробная информация">
                            <template #trigger="slotProps">
                                <InfoIcon v-bind="slotProps.vbind" width="1.4em" height="1.4em" />
                            </template>
                        </Tooltip>
                    </button>
                </template>
            </ActivityDetailsModal>
        </div>
        <div class="flex justify-end mt-5">
            <ActivityDetailsModal :id="activity.id" with-order>
                <template #trigger="{ vbind }">
                    <Button v-bind="vbind" variant="primary">
                        от {{ formatCurrency(activity.price) }}
                    </Button>
                </template>
            </ActivityDetailsModal>
        </div>
    </Card>
</template>
