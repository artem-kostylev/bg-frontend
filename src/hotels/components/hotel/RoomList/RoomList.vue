<script setup lang="ts">
import { onBeforeUnmount, computed } from "vue";
import { storeToRefs } from "pinia";
import { useLazyAsyncData } from "#imports";
import { useParams, useQuery } from "@/app/composables";
import { Modal, Typography, Spin, Grid } from "@ui/components";
import { RoomCard, AvailableDates } from "@/hotels/components";
import type { FetchRoomsQuery } from "@/hotels/services";
import { fetchRooms } from "@/hotels/services";
import { useRoomsStore } from "@/hotels/stores";
import { Empty } from "@/app/components";

const params = useParams<{ id: string }>();
const query = useQuery<FetchRoomsQuery>();

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

onBeforeUnmount(() => roomsStore.$reset());
</script>

<template>
    <div>
        <Typography variant="h2" as="h2">Номера</Typography>
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
                <AvailableDates :has-next="data.has_next" />
            </Modal>
        </div>
    </div>
</template>
