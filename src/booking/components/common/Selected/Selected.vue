<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { formatDate, pluralize } from '@/app/lib';
import {
    InsuranceList,
    TransferList,
    TicketList,
    AccommodationList,
    ExtraActivityList,
} from '@/booking/components';
import type {
    Accommodation,
    Insurance,
    Transfer,
    General,
    OrderDetailGeneral,
    Movement,
    ExtraActivity,
    IncludedActivity,
} from '@/booking/types';
import { Divider, Collapse, Grid, IconFilled } from '@ui/components';
import {
    BusIcon,
    ShieldIcon,
    AirplaneTakeoffIcon,
    AirplaneIcon,
    CalendarIcon,
    UsersIcon,
    BuildingsIcon,
    PalmIcon,
} from '@ui/icons';

type Props = {
    general: General | OrderDetailGeneral;
    accommodations: Accommodation[];
    transfers: Transfer[];
    insurances: Insurance[];
    movements: Movement[];
    extra_activities?: ExtraActivity[];
    included_acitivities?: IncludedActivity[];
    defaultOpen?: boolean;
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

const accommodationsError = computed(() => {
    return props.accommodations.some(accommodation =>
        accommodation.rooms.some(room => room.status === 2)
    );
});
</script>

<template>
    <Grid class="gap-4 md:gap-6" :class="$attrs.class" :style="$attrs.style">
        <div class="flex flex-wrap -mx-2.5 -mb-2.5">
            <div class="px-2.5 mb-2.5" v-if="movements.length">
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
            v-if="accommodations?.length"
            :start-icon="BuildingsIcon"
            :default-open="defaultOpen"
            title="Проживание"
            :error="accommodationsError"
        >
            <AccommodationList :accommodations="accommodations" />
        </Collapse>
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
            :start-icon="ShieldIcon"
            :default-open="defaultOpen"
            title="Страховки"
        >
            <InsuranceList :insurances="insurances" />
        </Collapse>
        <Collapse
            v-if="extra_activities?.length"
            :start-icon="PalmIcon"
            :default-open="defaultOpen"
            title="Чем заняться"
        >
            <ExtraActivityList :extra-activities="extra_activities" />
        </Collapse>
        <Divider dashed />
    </Grid>
</template>
