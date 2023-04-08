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
import { formatDates, pluralize } from "@/app/lib";
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
    return `${formatDates([props.general.date_start, props.general.date_finish])} 
    (${duration.value})`;
});
</script>

<template>
    <div>
        <Typography variant="h2" as="h2" class="mb-4">Выбранный состав</Typography>
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
        <Grid cols="4" class="gap-2.5 md:gap-5 mt-4">
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
