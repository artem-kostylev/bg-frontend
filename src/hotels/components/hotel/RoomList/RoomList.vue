<script setup lang="ts">
import { onBeforeUnmount, computed } from "vue";
import { storeToRefs } from "pinia";
import { useLazyAsyncData } from "#imports";
import { useParams } from "@/app/composables";
import { RoomCard, AvailableDates } from "@/hotels/components";
import { fetchRooms } from "@/hotels/services";
import { useRooms } from "@/hotels/stores";
import { Modal } from "@ui/components";

const params = useParams<{ id: string }>();

const { data, pending } = useLazyAsyncData("rooms", () => fetchRooms(params.value.id), {
    server: false,
});

const roomsStore = useRooms();
const { currentGroupIndex, openModal } = storeToRefs(roomsStore);

const isLastGroup = computed(() => {
    return data.value && currentGroupIndex.value === data.value.groups.length - 1;
});

onBeforeUnmount(() => roomsStore.$reset());
</script>

<template>
    <div>
        <div v-if="pending">loading...</div>
        <div v-else-if="data">
            <template v-for="(group, index) in data.groups" :key="index">
                <template v-if="currentGroupIndex === index">
                    <div v-if="!group.rooms.length">Комнаты по заданным критериям не найдены</div>
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
            </template>
            <Modal v-model="openModal">
                <AvailableDates />
            </Modal>
        </div>
    </div>
</template>
