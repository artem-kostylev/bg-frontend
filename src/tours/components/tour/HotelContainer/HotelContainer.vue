<script setup lang="ts">
import { useLazyAsyncData } from "#imports";
import { Page } from "@/app/components";
import { HotelDetails, RoomList } from "@/tours/components";
import { fetchHotel } from "@/tours/services";
import { Spin } from "@ui/components";

type Props = {
    id: string | number;
};

const props = defineProps<Props>();

const { data, pending } = useLazyAsyncData("hotel", () => fetchHotel(props.id));
</script>

<template>
    <Page :meta="data?.meta">
        <Spin v-if="pending" color="primary" />
        <HotelDetails v-else-if="data" :hotel="data.hotel" class="mb-8" />
        <RoomList v-show="!pending" />
    </Page>
</template>
