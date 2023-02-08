<script setup lang="ts">
import { useHead, useLazyAsyncData, definePageMeta } from "#imports";
import { useQuery } from "@/app/composables";
import { hasKeys } from "@/app/lib";
import { TicketCard } from "@/booking/components";
import { fetchMovements, FetchMovementsQuery } from "@/booking/services";

definePageMeta({
    validate: route => hasKeys(route.query, ["accommodations_unikey", "tour_from"]),
});

const query = useQuery<FetchMovementsQuery>();

const { data, pending } = useLazyAsyncData("booking-tickets", () => fetchMovements(query.value));

useHead({
    title: "Билеты",
    meta: [
        {
            name: "description",
            content: "Описание страницы билеты",
        },
    ],
});
</script>

<template>
    <div>
        <div v-if="pending">loading...</div>
        <div v-else-if="data" class="grid grid-cols-3 gap-5">
            <TicketCard
                v-for="(movement, index) in data.movements"
                :key="index"
                :movement="movement"
            />
        </div>
    </div>
</template>
