<script setup lang="ts">
import { Button, Grid, Typography } from "@ui/components";
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
</script>

<template>
    <div>
        <Typography variant="h2" as="h2" class="mb-4">Выбранный состав</Typography>
        <div class="flex space-x-6 mb-4">
            <div class="flex items-center space-x-2">
                <div class="p-1.5 rounded-xl border border-slate-300">
                    <AirplaneTakeoffIcon width="1.1em" height="1.1em" />
                </div>
                <span>{{ general.from }}</span>
            </div>
            <div class="flex items-center space-x-2">
                <div class="p-1.5 rounded-xl border border-slate-300">
                    <CalendarIcon width="1.1em" height="1.1em" />
                </div>
                <span>
                    {{ formatDate(general.date_start) }}
                    - {{ formatDate(general.date_finish) }} ({{ duration }})
                </span>
            </div>
            <div class="flex items-center space-x-2">
                <div class="p-1.5 rounded-xl border border-slate-300">
                    <UsersIcon width="1.1em" height="1.1em" />
                </div>
                <span>{{ tourists }}</span>
            </div>
        </div>
        <Grid cols="4">
            <Button :end-icon="ChevronRightIcon" justify="between">
                <div class="flex items-center">
                    <BuildingsIcon width="1.1em" height="1.1em" />
                    <span class="ml-2.5">Проживание</span>
                </div>
            </Button>
            <Button :end-icon="ChevronRightIcon" justify="between">
                <div class="flex items-center">
                    <AirplaneIcon width="1.1em" height="1.1em" />
                    <span class="ml-2.5">Билеты</span>
                </div>
            </Button>
        </Grid>
    </div>
</template>
