<script setup lang="ts">
import { onBeforeUnmount, computed } from "vue";
import { storeToRefs } from "pinia";
import { useLazyAsyncData } from "#imports";
import { useParams } from "@/app/composables";
import { RoomCard, AvailableDates } from "@/hotels/components";
import type { FetchRoomsQuery } from "@/hotels/services";
import { fetchRooms } from "@/hotels/services";
import { useRoomsStore } from "@/hotels/stores";
import { Modal, Typography, Spin } from "@ui/components";
import { useQuery } from "@/app/composables";

const params = useParams<{ id: string }>();
const query = useQuery<FetchRoomsQuery>();

const roomsStore = useRoomsStore();
const { currentGroupIndex, openModal } = storeToRefs(roomsStore);

const { data, pending } = useLazyAsyncData(
    "rooms",
    () => fetchRooms(params.value.id, query.value),
    { server: false }
);

const isLastGroup = computed(() => {
    return currentGroupIndex.value + 1 === data.value?.groups.length;
});

onBeforeUnmount(() => roomsStore.$reset());
</script>

<template>
    <div>
        <Typography variant="h3" as="h2">Номера</Typography>
        <Spin v-if="pending" class="py-5" color="primary" />
        <div v-else-if="data" class="py-5">
            <template v-for="(group, index) in data.groups" :key="index">
                <Transition
                    mode="out-in"
                    enter-active-class="transform transition ease-in-out duration-500"
                    enter-from-class="translate-x-1/2"
                    enter-to-class="translate-x-0"
                >
                    <template v-if="currentGroupIndex === index">
                        <div v-if="!group.rooms.length">
                            Комнаты по заданным критериям не найдены
                        </div>
                        <template v-else>
                            <div class="grid grid-cols-3 gap-5">
                                <RoomCard
                                    v-for="room in group.rooms"
                                    :key="room.id"
                                    :room="room"
                                    :is-last-group="isLastGroup"
                                />
                            </div>
                        </template>
                    </template>
                </Transition>
            </template>
            <Modal v-model="openModal">
                <AvailableDates />
            </Modal>
        </div>
    </div>
</template>
