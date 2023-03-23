<script setup lang="ts">
import { computed } from "vue";
import { useLazyAsyncData, definePageMeta } from "#imports";
import { useQuery } from "@/app/composables";
import { hasKeys } from "@/app/lib";
import { Page } from "@/app/components";
import { TicketCard } from "@/booking/components";
import type { FetchMovementsQuery } from "@/booking/services";
import { fetchMovements } from "@/booking/services";
import { Spin, Typography } from "@ui/components";

definePageMeta({
    validate: route => hasKeys(route.query, ["accommodations_unikey", "tour_from"]),
});

const query = useQuery<FetchMovementsQuery>();

const { data, pending } = useLazyAsyncData("booking-tickets", () => fetchMovements(query.value), {
    watch: [() => query.value.ids],
});

const meta = computed(() => ({
    title: data.value?.direction,
    description: "Описание страницы билеты",
}));
</script>

<template>
    <Page :meta="meta">
        <Spin v-if="pending" color="primary" />
        <div v-else-if="data">
            <Typography variant="h1" as="h1" class="mb-5">{{ data.direction }}</Typography>
            <div class="grid grid-cols-3 gap-5">
                <TicketCard
                    v-for="(movement, index) in data.movements"
                    :key="index"
                    :movement="movement"
                />
            </div>
        </div>
    </Page>
</template>
