<script setup lang="ts">
import { Card, Image, Typography, Tooltip, Button } from '@ui/components';
import type { AllActivity } from '@/booking/types';
import { ActivityDetailsModal } from '@/booking/components';
import { CheckIcon, InfoIcon, XIcon } from '@ui/icons';
import { formatCurrency, pluralize } from '@/app/lib';
import { useCompositionStore } from '@/booking/stores';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

type Props = {
    activity: AllActivity;
};

const props = defineProps<Props>();

const compositionStore = useCompositionStore();
const { removeTickets } = compositionStore;
const { selectedTickets } = storeToRefs(compositionStore);

const selected = computed(() => {
    return selectedTickets.value[props.activity.id];
});

const priceType = computed(() => {
    return props.activity.price_type === 'per_person' ? 'За 1 человека' : 'За группу';
});

const selectedPriceType = computed(() => {
    const arr = [];

    const { adult, child } = selected.value;

    adult && arr.push(`${pluralize(adult, ['взрослого', 'взрослых', 'взрослых'])}`);
    child && arr.push(pluralize(child, ['ребенка', 'детей', 'детей']));

    return `За ${arr.join(' и ')}`;
});
</script>

<template>
    <Card cover-class="h-[14rem] bg-secondary-100 relative">
        <template #cover>
            <Image
                :src="activity.image.url"
                :alt="activity.name"
                class="w-full h-full object-cover"
            />
            <div class="absolute top-0 right-0">
                <div
                    :class="[
                        'text-white px-2.5 py-1.5 text-sm rounded-bl-xl space-x-2 flex items-center',
                        selected ? 'bg-success-600' : 'bg-warning-600',
                    ]"
                >
                    <CheckIcon v-if="selected" width="1.2em" height="1.2em" />
                    <div>{{ selected ? 'Выбрано' : 'Дополнительно' }}</div>
                </div>
            </div>
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
            <div v-if="selected" class="space-y-1 text-right">
                <div class="flex items-center justify-end space-x-2.5">
                    <button @click="removeTickets(activity.id)">
                        <XIcon width="1.2em" height="1.2em" class="text-danger-500" />
                    </button>
                    <Button disabled>{{ formatCurrency(selected.price as number) }}</Button>
                </div>
                <Typography variant="description">{{ selectedPriceType }}</Typography>
            </div>
            <ActivityDetailsModal v-else :id="activity.id" :dates="activity.date" with-order>
                <template #trigger="{ vbind }">
                    <div class="space-y-1 text-right">
                        <Button v-bind="vbind" variant="primary">
                            от {{ formatCurrency(activity.price) }}
                        </Button>
                        <Typography variant="description">{{ priceType }}</Typography>
                    </div>
                </template>
            </ActivityDetailsModal>
        </div>
    </Card>
</template>
