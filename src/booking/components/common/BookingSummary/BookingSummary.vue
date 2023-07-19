<script setup lang="ts">
import { computed } from 'vue';
import { formatDate, pluralize } from '@/app/lib';
import type { General, OrderDetailGeneral } from '@/booking/types';
import { AirplaneTakeoffIcon, CalendarIcon, UsersIcon } from '@ui/icons';
import { IconFilled } from '@ui/components';

type Props = {
    general: General | OrderDetailGeneral;
    hasMovements: boolean;
};

const props = defineProps<Props>();

const duration = computed(() => pluralize(props.general.duration, ['ночь', 'ночи', 'ночей']));
const tourists = computed(() =>
    pluralize(props.general.qty_tourists, ['турист', 'туриста', 'туристов'])
);

const dates = computed(() => {
    return `с ${formatDate(props.general.date_start, 'D')} по ${formatDate(
        props.general.date_finish,
        'D MMM'
    )}
    на ${duration.value}`;
});
</script>

<template>
    <div class="flex flex-wrap -mx-2.5 -mb-2.5">
        <div class="px-2.5 mb-2.5" v-if="hasMovements">
            <IconFilled :icon="AirplaneTakeoffIcon" :label="general.from" />
        </div>
        <div class="px-2.5 mb-2.5">
            <IconFilled :icon="CalendarIcon" :label="dates" />
        </div>
        <div class="px-2.5 mb-2.5">
            <IconFilled :icon="UsersIcon" :label="tourists" />
        </div>
    </div>
</template>
