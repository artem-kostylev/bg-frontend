<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useRoomsStore } from "@/hotels/stores";
import { Button } from "@ui/components";
import { resolveComponent } from "#imports";

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
</script>

<template>
    <div>
        <div v-for="(availableDate, key) in availableDates" :key="key">
            <div class="font-semibold">{{ key }}</div>
            <div v-for="(item, k) in availableDate" :key="k" class="mb-4">
                {{ item.begin_date }} / {{ item.duration }}
                <Button
                    :as="NuxtLink"
                    :to="{
                        name: 'booking-tickets',
                        query: {
                            ...$route.query,
                            accommodations_unikey: item.accommodations_unikey,
                        },
                    }"
                >
                    {{ item.price }}
                </Button>
            </div>
        </div>
    </div>
</template>
