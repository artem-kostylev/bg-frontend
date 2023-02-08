<script setup lang="ts">
import { useLazyAsyncData } from "#imports";
import { fetchHome } from "@/page/services";
import { Page } from "@/app/components";

const { data, pending } = useLazyAsyncData("home", () => fetchHome());

const meta = {
    title: "Библио-Глобус – туры, авиабилеты, билеты на поезд, бронирование отелей",
    description: "Библио-Глобус – туры, авиабилеты, билеты на поезд, бронирование отелей",
};
</script>

<template>
    <Page :meta="meta">
        <div v-if="pending">loading...</div>
        <div v-else-if="data">{{ data }}</div>
    </Page>
</template>
