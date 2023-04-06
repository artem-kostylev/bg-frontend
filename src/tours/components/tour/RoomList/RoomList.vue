<script setup lang="ts">
import { onBeforeUnmount, computed } from "vue";
import { storeToRefs } from "pinia";
import { useLazyAsyncData } from "#imports";
import { useParams, useQuery } from "@/app/composables";
import { Modal, Typography, Spin, Grid } from "@ui/components";
import { RoomCard, AvailableDates } from "@/tours/components";
import { fetchRooms } from "@/tours/services";
import { useRoomsStore } from "@/tours/stores";
import { Empty } from "@/app/components";
import type { TourType } from "@/tours/types";
import type { FiltersRaw } from "@/app/types";

const params = useParams<{ id: string }>();
const query = useQuery<
    FiltersRaw & {
        tour_type?: TourType;
        hotel_ids?: number[];
        accommodations_unikey?: string[][];
    }
>();

const roomsStore = useRoomsStore();
const { currentGroupIndex, openModal } = storeToRefs(roomsStore);

const { data, pending, error } = useLazyAsyncData(
    "rooms",
    () => fetchRooms(Number(params.value.id), query.value),
    { server: false }
);

const isLastGroup = computed(() => {
    return currentGroupIndex.value + 1 === data.value?.groups.length;
});

const title = computed(() => {
    if (!data.value || data.value.groups.length === 1) return "Номера";
    return `Номера для ${currentGroupIndex.value + 1} группы`;
});

onBeforeUnmount(() => roomsStore.$reset());

const hasNext = computed(() => {
    if (!data.value) return false;

    return query.value.hotel_ids
        ? data.value.general.qty_hotels === query.value.hotel_ids.length + 1
        : false;
});
</script>

<template>
    <div>
        {{ hasNext }}
        <Typography variant="h2" as="h2">{{ title }}</Typography>
        <Spin v-if="pending" class="py-5" color="primary" />
        <Empty v-else-if="error" />
        <div v-else-if="data" class="py-5">
            <template v-for="(group, index) in data.groups" :key="index">
                <Transition
                    mode="out-in"
                    enter-active-class="transform transition ease-in-out duration-500"
                    enter-from-class="translate-x-1/2"
                    enter-to-class="translate-x-0"
                >
                    <template v-if="currentGroupIndex === index">
                        <Grid cols="3" v-if="group.rooms.length">
                            <RoomCard
                                v-for="room in group.rooms"
                                :key="room.id"
                                :room="room"
                                :is-last-group="isLastGroup"
                            />
                        </Grid>
                        <Empty v-else />
                    </template>
                </Transition>
            </template>
            <Modal v-model="openModal" title="Даты проживания и количество ночей">
                <AvailableDates :has-movements="!!data.general.qty_movements" :has-next="hasNext" />
            </Modal>
        </div>
    </div>
</template>
