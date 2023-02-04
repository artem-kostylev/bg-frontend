<script setup lang="ts">
import { computed, useLazyAsyncData, useRoute } from "#imports";
import { RoomCard } from "@/hotels/components";
import { fetchRooms } from "@/hotels/services";

const route = useRoute();

const id = computed(() => route.params.id as string);

const { data, pending } = useLazyAsyncData("rooms", () => fetchRooms(id.value), {
    server: false,
});
</script>

<template>
    <div>
        <div v-if="pending">loading...</div>
        <div v-else-if="data" class="grid grid-cols-3 gap-5">
            <RoomCard v-for="room in data.groups[0].rooms" :key="room.id" :room="room" />
        </div>
    </div>
</template>
