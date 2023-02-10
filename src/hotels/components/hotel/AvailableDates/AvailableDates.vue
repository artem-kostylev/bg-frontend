<script setup lang="ts">
// import { useQuery } from "@/app/composables";
// import type { AvailableDate, AvailableDateItem } from "@/hotels/types";
import { useRooms } from "@/hotels/stores";

const { selectedDates } = useRooms();

// const query = useQuery<{ tour_from: number }>();

// const getQuery = (item: AvailableDateItem) => ({
//     accommodations_unikey: item.accommodation_unikey,
//     tour_from: query.value.tour_from,
// });
</script>

<template>
    <div>
        {{ selectedDates }}
        <!-- <NuxtLink :to="{ name: 'booking-tickets', query: getQuery(item) }">
                    {{ item.begin_date }}
        </NuxtLink> -->
    </div>
</template>
