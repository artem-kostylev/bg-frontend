<script setup lang="ts">
import { useLazyAsyncData, useHead } from "#imports";
import { useParams } from "@/app/composables";
import { Details, RoomList } from "@/hotels/components";
import { fetchHotel } from "@/hotels/services";

const params = useParams<{ id: string }>();

const { data, pending } = useLazyAsyncData("hotel", () => fetchHotel(params.value.id), {
    server: false,
});

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
