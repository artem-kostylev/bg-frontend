<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { resolveComponent } from "#imports";
import { useRoomsStore } from "@/tours/stores";
import type { RouteLocationNamedRaw, LocationQueryValueRaw } from "vue-router";
import { useParams, useQuery } from "@/app/composables";
import type { FiltersRaw } from "@/app/types";
import { formatCurrency, formatDates, formatDate } from "@/app/lib";
import { Button } from "@ui/components";
import { mergeSelectedDates, type MergedSelectedDateItem } from "@/tours/lib";

const route = useRoute();
const params = useParams<{ id: number; type: "activity" | "multi" }>();
const query = useQuery<FiltersRaw & { accommodations_unikey?: string[][] }>();

type Props = {
    hasNext: boolean;
    hasMovements: boolean;
};

const props = defineProps<Props>();

const { selectedDates } = storeToRefs(useRoomsStore());

const availableDates = computed(() => {
    return mergeSelectedDates(selectedDates.value);
});

const NuxtLink = resolveComponent("NuxtLink");

const getTo = (item: MergedSelectedDateItem) => {
    const to = {} as RouteLocationNamedRaw;

    to.query = {
        ...query.value,
        accommodations_unikey: [
            ...(query.value.accommodations_unikey || ""),
            ...item.accommodation_unikey,
        ] as LocationQueryValueRaw[],
    };

    if (props.hasNext) {
        to.name = route.name as string;
        to.params = { id: params.value.id };
    } else {
        if (!props.hasMovements) {
            to.name = "booking-composition";
            to.query.has_movements = "false";
        } else {
            to.name = "booking-tickets";
        }

        if (route.name === "tours-multi-id" || route.name === "tours-activity-id") {
            to.query!.package_tour_id = Number(params.value.id);
        }
    }

    return to;
};
</script>

<template>
    <div class="space-y-4">
        <div v-for="date in availableDates" :key="date.begin_date">
            <div class="font-semibold mb-2">{{ formatDate(date.begin_date) }}</div>
            <div
                v-for="(item, index) in date.items"
                :key="index"
                class="border-t border-slate-200 border-dashed py-1.5 last:pb-0 flex items-center justify-between"
            >
                {{ formatDates(item.begin_date) }} / {{ item.duration }}
                <Button variant="primary" size="sm" :as="NuxtLink" :to="getTo(item)">
                    от {{ formatCurrency(item.price) }}
                </Button>
            </div>
        </div>
    </div>
</template>
