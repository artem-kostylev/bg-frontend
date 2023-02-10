<script setup lang="ts">
import { useLazyAsyncData, definePageMeta } from "#imports";
import { useQuery } from "@/app/composables";
import { hasKeys } from "@/app/lib";
import { Page } from "@/app/components";
import { TicketCard } from "@/booking/components";
import type { FetchMovementsQuery } from "@/booking/services";
import { fetchMovements } from "@/booking/services";

definePageMeta({
    validate: route => hasKeys(route.query, ["accommodations_unikey", "tour_from"]),
});

const query = useQuery<FetchMovementsQuery>();

const { data, pending } = useLazyAsyncData("booking-tickets", () => fetchMovements(query.value));

const meta = {
    title: "Билеты",
    description: "Описание страницы билеты",
};
</script>

<template>
    <Page :meta="meta">
        <div v-if="pending">loading...</div>
        <div v-else-if="data" class="grid grid-cols-3 gap-5">
            <TicketCard
                v-for="(movement, index) in data.movements"
                :key="index"
                :movement="movement"
            />
        </div>
    </Page>
</template>
