<script setup lang="ts">
import { useHead, useLazyAsyncData } from "#imports";
import { useQuery } from "@/app/composables";
import { fetchConfirmation, FetchConfirmationQuery } from "@/booking/services";

const query = useQuery<FetchConfirmationQuery>();

const { data, pending } = useLazyAsyncData("booking-confirmation", () =>
    fetchConfirmation(query.value)
);

useHead({
    title: "Оформление тура",
    meta: [
        {
            name: "description",
            content: "Описание страницы оформления тура",
        },
    ],
});
</script>

<template>
    <div>
        <div v-if="pending">loading...</div>
        <div v-else-if="data">{{ data }}</div>
    </div>
</template>
