<script setup lang="ts">
import { useLazyAsyncData } from "#imports";
import { Page } from "@/app/components";
import { HotelDetails, RoomList } from "@/hotels/components";
import { fetchHotel } from "@/hotels/services";
import { Spin } from "@ui/components";

type Props = {
    id: number | string;
};

const props = defineProps<Props>();

const { data, pending } = useLazyAsyncData("hotel", () => fetchHotel(props.id));
</script>

<template>
    <Page :meta="data?.meta">
        <Spin v-if="pending" color="primary" />
        <HotelDetails v-else-if="data" :hotel="data.hotel" class="mb-4" />
        <RoomList v-show="!pending" />
    </Page>
</template>
