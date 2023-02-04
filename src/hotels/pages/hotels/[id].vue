<script setup lang="ts">
import { useLazyAsyncData, useRoute, computed, useHead } from "#imports";
import { Details, RoomList } from "@/hotels/components";
import { fetchHotel } from "@/hotels/services";

const route = useRoute();

const id = computed(() => route.params.id as string);

const { data, pending } = useLazyAsyncData("hotel", () => fetchHotel(id.value));

useHead({
    title: data.value?.meta.title,
    meta: [
        {
            name: "description",
            content: data.value?.meta.description,
        },
    ],
});
</script>

<template>
    <div>
        <div v-if="pending">loading...</div>
        <Details v-else-if="data" :hotel="data.hotel" />
        <RoomList />
    </div>
</template>
