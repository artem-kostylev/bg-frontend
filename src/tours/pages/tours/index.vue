<script setup lang="ts">
import { useLazyAsyncData, resolveComponent } from "#imports";
import { fetchHome } from "@/pages/services";
import { Page } from "@/app/components";
import { Spin, Button } from "@ui/components";

const { data, pending } = useLazyAsyncData("home", () => fetchHome());

const meta = {
    title: "Библио-Глобус – туры, авиабилеты, билеты на поезд, бронирование отелей",
    description: "Библио-Глобус – туры, авиабилеты, билеты на поезд, бронирование отелей",
};

const NuxtLink = resolveComponent("NuxtLink");
</script>

<template>
    <Page :meta="meta">
        <Spin v-if="pending" color="primary" />
        <div v-else-if="data">
            <div class="mb-5 grid gap-2.5">
                <Button
                    :as="NuxtLink"
                    to="/tours/search?tour_from=260&tour_to=208_location&tour_begin_date[0]=2023-02-01&tour_begin_date[1]=2023-04-30&tour_duration[0]=1&tour_duration[1]=28&tour_tourists[0]=36,36"
                >
                    Стандартные туры
                </Button>
                <Button
                    :as="NuxtLink"
                    to="/tours/search?tour_from=260&tour_to=7_location&tour_begin_date[0]=2022-05-01&tour_begin_date[1]=2023-06-30&tour_duration[0]=1&tour_duration[1]=28&tour_tourists[0]=36,36&tour_tourists[1]=36,36"
                >
                    Стандартные туры с несколькими проживаниями
                </Button>
                <Button
                    :as="NuxtLink"
                    to="/tours-multi/search?tour_begin_date[0]=2023-07-10&tour_begin_date[1]=2023-07-16&tour_duration[0]=7&tour_duration[1]=14&tour_from=260&tour_to=7_location&tour_tourists[0]=36,36"
                >
                    Мультитуры
                </Button>
                <Button
                    :as="NuxtLink"
                    to="/tours-multi/search?tour_from=260&tour_to=7_location&tour_begin_date[0]=2023-07-10&tour_begin_date[1]=2023-07-16&tour_duration[0]=7&tour_duration[1]=14&tour_tourists[0]=36,36&tour_tourists[1]=36,36"
                >
                    Мультитуры с несколькими проживаниями
                </Button>
                <Button
                    :as="NuxtLink"
                    to="/tours-excursion/search?tour_from=260&tour_to=208_location&tour_begin_date[0]=2022-11-01&tour_begin_date[1]=2023-06-30&tour_duration[0]=1&tour_duration[1]=28&tour_tourists[0]=36,36"
                >
                    Экскурсионные туры
                </Button>
                <Button
                    :as="NuxtLink"
                    to="/tours-excursion/search?tour_from=260&tour_to=208_location&tour_begin_date[0]=2023-03-31&tour_begin_date[1]=2023-06-30&tour_duration[0]=1&tour_duration[1]=28&tour_tourists[0]=36,36&tour_tourists[1]=36,36"
                >
                    Экскурсионные туры с несколькими проживаниями
                </Button>
            </div>
            {{ data }}
        </div>
    </Page>
</template>
