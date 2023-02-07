<script setup lang="ts">
import { useLazyAsyncData } from "#imports";
import { useParams } from "@/app/composables";
import { RoomCard } from "@/hotels/components";
import { fetchRooms } from "@/hotels/services";

const params = useParams<{ id: string }>();

const { data, pending } = useLazyAsyncData("rooms", () => fetchRooms(params.value.id), {
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
