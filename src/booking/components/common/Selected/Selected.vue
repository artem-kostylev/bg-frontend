<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { formatDates, pluralize } from '@/app/lib';
import { InsuranceList, TransferList, TicketList } from '@/booking/components';
import type { Insurance, Transfer, General, Movement } from '@/booking/types';
import { Divider, Collapse, Grid, IconFilled } from '@ui/components';
import {
    BusIcon,
    ShildIcon,
    AirplaneTakeoffIcon,
    AirplaneIcon,
    CalendarIcon,
    UsersIcon,
} from '@ui/icons';

type Props = {
    general: General;
    transfers: Transfer[];
    insurances: Insurance[];
    movements: Movement[];
    defaultOpen?: boolean;
};

const props = defineProps<Props>();

const duration = computed(() => pluralize(props.general.duration, ['ночь', 'ночи', 'ночей']));
const tourists = computed(() =>
    pluralize(props.general.qty_tourists, ['турист', 'туриста', 'туристов'])
);

const dates = computed(() => {
    return `${formatDates([props.general.date_start, props.general.date_finish])} 
    (${duration.value})`;
});
</script>

<template>
    <Grid class="gap-4 md:gap-6" :class="$attrs.class" :style="$attrs.style">
        <div class="flex flex-wrap -mx-2.5 -mb-2.5">
            <div class="px-2.5 mb-2.5">
                <IconFilled :icon="AirplaneTakeoffIcon" :label="general.from" />
            </div>
            <div class="px-2.5 mb-2.5">
                <IconFilled :icon="CalendarIcon" :label="dates" />
            </div>
            <div class="px-2.5 mb-2.5">
                <IconFilled :icon="UsersIcon" :label="tourists" />
            </div>
        </div>
        <Divider dashed />
        <Collapse
            v-if="movements?.length"
            :start-icon="AirplaneIcon"
            :default-open="defaultOpen"
            title="Билеты"
        >
            <TicketList :movements="movements" />
        </Collapse>
        <Collapse
            v-if="transfers?.length"
            :start-icon="BusIcon"
            :default-open="defaultOpen"
            title="Трансферы"
        >
            <TransferList :transfers="transfers" />
        </Collapse>
        <Collapse
            v-if="insurances?.length"
            :start-icon="ShildIcon"
            :default-open="defaultOpen"
            title="Страховки"
        >
            <InsuranceList :insurances="insurances" />
        </Collapse>
        <Divider dashed />
    </Grid>
</template>
