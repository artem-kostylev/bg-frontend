<script setup lang="ts">
import { computed } from "vue";
import { whenever } from "@vueuse/core";
import { useLazyAsyncData, definePageMeta } from "#imports";
import { useQuery } from "@/app/composables";
import { hasKeys } from "@/app/lib";
import { Page } from "@/app/components";
import { MovementList } from "@/booking/components";
import type { FetchMovementsQuery } from "@/booking/services";
import { fetchMovements } from "@/booking/services";
import { Spin, Typography } from "@ui/components";

definePageMeta({
    validate: route => hasKeys(route.query, ["accommodations_unikey", "tour_from"]),
});

const query = useQuery<FetchMovementsQuery>();

const { data, pending, execute } = useLazyAsyncData("booking-tickets", () =>
    fetchMovements(query.value)
);

const meta = computed(() => ({
    title: data.value?.direction,
    description: "Описание страницы билеты",
}));

whenever(
    () => query.value.ids,
    value => !Array.isArray(value[0]) && execute()
);
</script>

<template>
    <Page :meta="meta">
        <Spin v-if="pending" color="primary" />
        <div v-else-if="data" class="relative">
            <Typography variant="h1" as="h1" class="mb-5">{{ data.direction }}</Typography>
            <MovementList :movements="data.movements" :price="data.price" />
        </div>
    </Page>
</template>
