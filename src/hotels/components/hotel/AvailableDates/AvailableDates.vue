<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<!-- 
     TODO: Про типизировать
-->

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { resolveComponent } from "#imports";
import { useRoomsStore } from "@/hotels/stores";
import type { RouteLocationNamedRaw } from "vue-router";
import { useParams, useQuery } from "@/app/composables";
import type { FiltersRaw } from "@/tours/types";
import { formatCurrency, formatDates, formatDate } from "@/app/lib";
import { Button } from "@ui/components";

const params = useParams<{ id: number }>();
const query = useQuery<FiltersRaw & { accommodations_unikey?: string[][] }>();

type Props = {
    hasNext: boolean | null;
};

const props = defineProps<Props>();

const { selectedDates } = storeToRefs(useRoomsStore());

const valid = computed(() =>
    selectedDates.value
        .flat()
        .map(item => item.begin_date)
        .filter((item, index, items) => items.indexOf(item) !== index)
);

const availableDates = computed(() => {
    return selectedDates.value
        .reduce((a, b, index) => {
            b.forEach(item => {
                item.items.forEach((value: any) => {
                    value.index = index;
                });
            });

            return a.concat(b);
        }, [])
        .reduce((pv: any, cv: any) => {
            if (selectedDates.value.length > 1 && !valid.value.includes(cv.begin_date)) return pv;

            if (!pv[cv.begin_date]) {
                pv[cv.begin_date] = cv.items.reduce((pv2: any, cv2: any) => {
                    const key = cv2.begin_date.join(":");
                    pv2[key] = cv2;

                    !Array.isArray(cv2.accommodations_unikey) && (cv2.accommodations_unikey = []);
                    !cv2.accommodations_unikey[cv2.index] &&
                        (cv2.accommodations_unikey[cv2.index] = []);
                    cv2.accommodations_unikey[cv2.index].push(cv2.accommodation_unikey);

                    return pv2;
                }, {});
            } else {
                cv.items.forEach((item: any) => {
                    const key = item.begin_date.join(":");
                    if (pv[cv.begin_date][key]) {
                        const index = item.index;

                        !pv[cv.begin_date][key][index] &&
                            (pv[cv.begin_date][key].accommodations_unikey[index] = []);
                        pv[cv.begin_date][key].accommodations_unikey[index].push(
                            item.accommodation_unikey
                        );

                        pv[cv.begin_date][key].price = pv[cv.begin_date][key].price + item.price;
                    }
                });
            }

            return pv;
        }, {});
});

const NuxtLink = resolveComponent("NuxtLink");

const getTo = (item: any) => {
    const to = {} as RouteLocationNamedRaw;

    to.query = {
        ...query.value,
        accommodations_unikey: [
            ...(query.value.accommodations_unikey || ""),
            ...item.accommodations_unikey,
        ],
    };

    if (props.hasNext) {
        to.name = "tours-multi-id";
        to.params = { id: params.value.id };
    } else {
        to.name = "booking-tickets";

        if (["tours-multi-id", "tours-excursion-id"].includes(to.name)) {
            to.query.package_tour_id = Number(params.value.id);
        }
    }

    return to;
};
</script>

<template>
    <div class="space-y-4">
        <div v-for="(availableDate, key) in availableDates" :key="key">
            <div class="font-semibold mb-2">{{ formatDate(key as any) }}</div>
            <div
                v-for="(item, k) in availableDate"
                :key="k"
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
