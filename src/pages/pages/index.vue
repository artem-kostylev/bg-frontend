<script setup lang="ts">
import { useLazyAsyncData } from "#imports";
import { fetchHome } from "@/pages/services";
import { Page } from "@/app/components";
import { Spin } from "@ui/components";

const { data, pending } = useLazyAsyncData("home", () => fetchHome());

const meta = {
    title: "Библио-Глобус – туры, авиабилеты, билеты на поезд, бронирование отелей",
    description: "Библио-Глобус – туры, авиабилеты, билеты на поезд, бронирование отелей",
};
</script>

<template>
    <Page :meta="meta">
        <Spin v-if="pending" color="primary" />
        <div v-else-if="data">
            <NuxtLink
                to="/tours?tour_from=260&tour_to=208_location&tour_begin_date[0]=2023-02-01&tour_begin_date[1]=2023-04-30&tour_duration[0]=1&tour_duration[1]=28&tour_tourists[0]=36,36"
                >go to tours</NuxtLink
            >
            {{ data }}
        </div>
    </Page>
</template>
