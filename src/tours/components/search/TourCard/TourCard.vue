<script setup lang="ts">
import { resolveComponent } from "#imports";
import type { RouteLocationNamedRaw } from "vue-router";
import type { FiltersRaw } from "@/app/types";
import type { Tour } from "@/tours/types";
import { LocationList } from "@/app/components";
import { formatCurrency, formatDistance } from "@/app/lib";
import { useQuery, useParams } from "@/app/composables";
import { Button, Card, Typography, Image, Stars, Divider } from "@ui/components";
import {
    UmbrellaIcon,
    AirplaneIcon,
    ForkAndKnifeIcon,
    BuildingsIcon,
    BusIcon,
    ShildIcon,
    MountainIcon,
    LightingIcon,
} from "@ui/icons";
import { formatFood } from "@/tours/lib";

const params = useParams<{ id: string }>();
const query = useQuery<{ accommodations_unikey?: string[][]; hotel_ids?: number[] }>();

type Props = {
    tour: Tour;
    filters: FiltersRaw;
    variant: string;
    target?: "_blank";
};

const props = withDefaults(defineProps<Props>(), {
    target: undefined,
});

const NuxtLink = resolveComponent("NuxtLink");

const getTo = (id: number) => {
    const isPackage = props.variant === "tours-multi-id" || props.variant === "tours-activity-id";

    const name = props.variant.replace("-search", "-id");

    const to: RouteLocationNamedRaw = {
        name,
        params: {},
        query: {},
    };

    Object.assign(to.query!, props.filters);

    if (isPackage) {
        to.params!.id = params.value.id;
        to.query!.tour_type = "package";
        to.query!.hotel_ids = [...(query.value.hotel_ids || ""), id];
        to.query!.accommodations_unikey = query.value.accommodations_unikey as never;
    } else {
        to.params!.id = id;

        if (props.variant === "hotels-search") {
            to.query!.tour_type = "hotel";
        }
    }

    return to;
};

/**
 * TODO: Создать компонент Icon в который можно передавать label и цвет
 * Вынести included в отдельный компонент
 */
</script>

<template>
    <Card cover-class="h-[14rem] bg-slate-100" body-class="flex flex-col justify-end">
        <template #cover>
            <Image
                v-if="tour.hotel.images[0]"
                :src="tour.hotel.images[0].url"
                :alt="tour.hotel.name"
                class="w-full h-full object-cover"
            />
        </template>
        <template #header>
            <Stars v-if="tour.hotel.stars" :stars="tour.hotel.stars" class="mb-1" />
            <NuxtLink :to="getTo(tour.hotel.id)" :target="target">
                <Typography variant="h3" as="h2" class="mb-1">{{ tour.hotel.name }}</Typography>
            </NuxtLink>
            <LocationList target="_blank" :location="tour.hotel.location" />
        </template>
        <div class="flex space-x-4 mb-4" v-if="tour.hotel.food">
            <div v-if="tour.hotel.food" class="text-slate-500 flex items-center space-x-1.5">
                <div class="p-1 rounded-xl border border-slate-300">
                    <ForkAndKnifeIcon width="1.3em" height="1.3em" />
                </div>
                <span>{{ formatFood(tour.hotel.food) }}</span>
            </div>
            <div
                v-if="tour.hotel.beach_remoteness"
                class="text-slate-500 flex items-center space-x-1.5"
            >
                <div class="p-1 rounded-xl border border-slate-300">
                    <UmbrellaIcon width="1.3em" height="1.3em" />
                </div>
                <span>{{ formatDistance(tour.hotel.beach_remoteness) }}</span>
            </div>
            <div
                v-if="tour.hotel.airport_remoteness"
                class="text-slate-500 flex items-center space-x-1.5"
            >
                <div class="p-1 rounded-xl border border-slate-300">
                    <AirplaneIcon width="1.3em" height="1.3em" />
                </div>
                <span>{{ formatDistance(tour.hotel.airport_remoteness) }}</span>
            </div>
        </div>
        <Divider dashed class="mb-4" />
        <div class="mb-4 flex space-x-3">
            <div
                v-if="tour.flight_included"
                class="p-1 rounded-xl border border-transparent bg-primary-300/20 text-primary-500"
            >
                <AirplaneIcon width="1.3em" height="1.3em" />
            </div>
            <div
                class="p-1 rounded-xl border border-transparent bg-primary-300/20 text-primary-500"
            >
                <BuildingsIcon width="1.3em" height="1.3em" />
            </div>
            <div
                v-if="tour.transfer_included"
                class="p-1 rounded-xl border border-transparent bg-primary-300/20 text-primary-500"
            >
                <BusIcon width="1.3em" height="1.3em" />
            </div>
            <div
                v-if="tour.insurance_included"
                class="p-1 rounded-xl border border-transparent bg-primary-300/20 text-primary-500"
            >
                <ShildIcon width="1.3em" height="1.3em" />
            </div>
            <div
                v-if="tour.excursion_included"
                class="p-1 rounded-xl border border-transparent bg-primary-300/20 text-primary-500"
            >
                <MountainIcon width="1.3em" height="1.3em" />
            </div>
            <div
                v-if="tour.instant_booking"
                class="p-1 rounded-xl border border-transparent bg-orange-100 text-orange-700"
            >
                <LightingIcon width="1.3em" height="1.3em" />
            </div>
        </div>
        <Button :as="NuxtLink" :to="getTo(tour.hotel.id)" variant="primary" :target="target" block>
            от {{ formatCurrency(tour.price) }}
        </Button>
    </Card>
</template>
