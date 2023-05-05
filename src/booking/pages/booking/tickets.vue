<script setup lang="ts">
import { whenever } from "@vueuse/core";
import { useLazyAsyncData, useName } from "#imports";
import { useQuery } from "@/app/composables";
import { Page, Empty } from "@/app/components";
import { MovementList } from "@/booking/components";
import type { FetchMovementsQuery } from "@/booking/services";
import { fetchMovements } from "@/booking/services";
import { Spin, Typography } from "@ui/components";

const name = useName<"booking-tickets" | "avia-search">();
const query = useQuery<FetchMovementsQuery>();

const { data, pending, execute } = useLazyAsyncData("booking-tickets", () => {
    return fetchMovements(query.value, name.value);
});

whenever(
    () => query.value.ids,
    value => !Array.isArray(value[0]) && execute()
);
</script>

<template>
    <Page :meta="data?.meta">
        <Spin v-if="pending" color="primary" />
        <div v-else-if="data" class="relative">
            <Typography variant="h1" as="h1" class="mb-5">{{ data.direction }}</Typography>
            <MovementList
                v-if="data.movements.length"
                :movements="data.movements"
                :price="data.price"
            />
            <Empty v-else />
        </div>
    </Page>
</template>
