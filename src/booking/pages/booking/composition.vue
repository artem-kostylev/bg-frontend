<script setup lang="ts">
import { useHead, useLazyAsyncData } from "#imports";
import { useQuery } from "@/app/composables";
import { fetchComposition, FetchCompositionParams } from "@/booking/services";

const query = useQuery<FetchCompositionParams>();

const { data, pending } = useLazyAsyncData("booking-composition", () =>
    fetchComposition(query.value)
);

useHead({
    title: "Состав тура",
    meta: [
        {
            name: "description",
            content: "Описание состава тура",
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
