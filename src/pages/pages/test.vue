<script setup lang="ts">
import { resolveComponent } from "vue";
import { Button } from "@ui/components";

const NuxtLink = resolveComponent("NuxtLink");
</script>

<template>
    <div class="mb-5 flex flex-wrap gap-2.5">
        <Button
            :as="NuxtLink"
            to="/tours/search?tour_from=260&tour_to=7_location&tour_begin_date[0]=2023-04-01&tour_begin_date[1]=2023-06-30&tour_duration[0]=1&tour_duration[1]=28&tour_tourists[0]=36,36"
        >
            Стандартные туры
        </Button>
        <Button
            :as="NuxtLink"
            to="/tours/search?tour_from=260&tour_to=7_location&tour_begin_date[0]=2023-04-01&tour_begin_date[1]=2023-06-30&tour_duration[0]=1&tour_duration[1]=28&tour_tourists[0]=36,36&tour_tourists[1]=36,36"
        >
            Стандартные туры с несколькими проживаниями
        </Button>
        <Button
            :as="NuxtLink"
            to="/hotels/search?tour_from=260&tour_to=71_location&tour_begin_date[0]=2023-04-05&tour_begin_date[1]=2023-09-30&tour_duration[0]=1&tour_duration[1]=28&tour_tourists[0]=36,36&tour_price[0]=1&tour_price[1]=99999999"
        >
            Отели
        </Button>
        <Button
            :as="NuxtLink"
            to="/hotels/search?tour_from=260&tour_to=71_location&tour_begin_date[0]=2023-04-05&tour_begin_date[1]=2023-09-30&tour_duration[0]=1&tour_duration[1]=28&tour_tourists[0]=36,36&tour_tourists[1]=36,36&tour_price[0]=1&tour_price[1]=99999999"
        >
            Отели с несколькими проживаниями
        </Button>
        <Button
            :as="NuxtLink"
            to="/tours-multi/search?tour_from=260&tour_to=6_location&tour_begin_date[0]=2023-04-07&tour_begin_date[1]=2023-04-14&tour_duration[0]=7&tour_duration[1]=14&tour_tourists[0]=36,36"
        >
            Мультитуры
        </Button>
        <Button
            :as="NuxtLink"
            to="/tours-multi/search?tour_from=260&tour_to=6_location&tour_begin_date[0]=2023-04-07&tour_begin_date[1]=2023-04-14&tour_duration[0]=7&tour_duration[1]=14&tour_tourists[0]=36,36&tour_tourists[1]=36,36"
        >
            Мультитуры с несколькими проживаниями
        </Button>
        <Button
            :as="NuxtLink"
            to="/tours-activity/search?tour_from=260&tour_to=3_location&tour_begin_date[0]=2023-02-01&tour_begin_date[1]=2023-08-31&tour_duration[0]=1&tour_duration[1]=28&tour_tourists[0]=36,36"
        >
            Экскурсионные туры
        </Button>
        <Button
            :as="NuxtLink"
            to="/tours-activity/search?tour_from=260&tour_to=3_location&tour_begin_date[0]=2023-02-01&tour_begin_date[1]=2023-08-31&tour_duration[0]=1&tour_duration[1]=28&tour_tourists[0]=36,36&tour_tourists[1]=36,36"
        >
            Экскурсионные туры с несколькими проживаниями
        </Button>
        <Button
            :as="NuxtLink"
            to="/avia/search?tour_from=260&tour_to=208_location&tour_begin_date[0]=2023-05-01&tour_tourists[0]=36"
        >
            Авиабилеты
        </Button>
    </div>
</template>
