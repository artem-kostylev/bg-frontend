<script setup lang="ts">
import { useLazyAsyncData, definePageMeta } from "#imports";
import { useParams } from "@/app/composables";
import { Page, ProgressBar } from "@/app/components";
import { Details, RoomList } from "@/hotels/components";
import { fetchHotel } from "@/hotels/services";
import { Spin } from "@ui/components";

definePageMeta({
    validate: ({ params }) => /^\d+$/.test(params.id as string),
});

const params = useParams<{ id: string }>();

const { data, pending } = useLazyAsyncData("hotel", () => fetchHotel(params.value.id), {
    server: false,
});
</script>

<template>
    <div>
        <ProgressBar />
        <Page :meta="data?.meta">
            <Spin v-if="pending" color="primary" />
            <Details v-else-if="data" :hotel="data.hotel" />
            <RoomList v-show="!pending" />
        </Page>
    </div>
</template>
