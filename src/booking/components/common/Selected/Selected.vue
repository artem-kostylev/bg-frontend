<script setup lang="ts">
import { Button, Grid, Typography, IconFilled } from "@ui/components";
import {
    BuildingsIcon,
    AirplaneIcon,
    ChevronRightIcon,
    AirplaneTakeoffIcon,
    CalendarIcon,
    UsersIcon,
} from "@ui/icons";
import type { General } from "@/booking/types";
import { formatDate, pluralize } from "@/app/lib";
import { computed } from "vue";

type Props = {
    general: General;
};

const props = defineProps<Props>();

const duration = computed(() => pluralize(props.general.duration, ["ночь", "ночи", "ночей"]));
const tourists = computed(() =>
    pluralize(props.general.qty_tourists, ["турист", "туриста", "туристов"])
);

const dates = computed(() => {
    return `
    ${formatDate(props.general.date_start)} 
    - ${formatDate(props.general.date_finish)} (${duration.value})`;
});
</script>

<template>
    <div>
        <Typography variant="h2" as="h2" class="mb-4">Выбранный состав</Typography>
        <div class="flex space-x-6 mb-4">
            <IconFilled :icon="AirplaneTakeoffIcon" :label="general.from" />
            <IconFilled :icon="CalendarIcon" :label="dates" />
            <IconFilled :icon="UsersIcon" :label="tourists" />
        </div>
        <Grid cols="4">
            <Button :end-icon="ChevronRightIcon" justify="between">
                <div class="flex items-center">
                    <BuildingsIcon width="1.2em" height="1.2em" />
                    <span class="ml-2.5">Проживание</span>
                </div>
            </Button>
            <Button :end-icon="ChevronRightIcon" justify="between">
                <div class="flex items-center">
                    <AirplaneIcon width="1.2em" height="1.2em" />
                    <span class="ml-2.5">Билеты</span>
                </div>
            </Button>
        </Grid>
    </div>
</template>
