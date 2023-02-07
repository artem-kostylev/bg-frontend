<script setup lang="ts">
import { useLazyAsyncData, useHead } from "#imports";
import { fetchHome } from "@/page/services";

const { data, pending } = useLazyAsyncData("home", () => fetchHome());

useHead({
    title: "Библио-Глобус – туры, авиабилеты, билеты на поезд, бронирование отелей",
    meta: [
        {
            name: "description",
            content: "Библио-Глобус – туры, авиабилеты, билеты на поезд, бронирование отелей",
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
