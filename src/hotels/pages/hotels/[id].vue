<script setup lang="ts">
import { useLazyAsyncData, definePageMeta } from "#imports";
import { useParams } from "@/app/composables";
import { Page } from "@/app/components";
import { Details, RoomList } from "@/hotels/components";
import { fetchHotel } from "@/hotels/services";

definePageMeta({
    validate: ({ params }) => /^\d+$/.test(params.id as string),
});

const params = useParams<{ id: string }>();

const { data, pending } = useLazyAsyncData("hotel", () => fetchHotel(params.value.id));
</script>

<template>
    <Page :meta="data?.meta">
        <div v-if="pending">loading...</div>
        <Details v-else-if="data" :hotel="data.hotel" />
        <RoomList />
    </Page>
</template>
