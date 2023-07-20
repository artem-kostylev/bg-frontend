<script setup lang="ts">
import { computed } from 'vue';
import { useLazyAsyncData } from '#imports';
import { useParams, useQuery } from '@/app/composables';
import {
    fetchLocationTours,
    fetchShortAttraction,
    fetchRecommendedHotels,
} from '@/attractions/services';
import { Spin } from '@ui/components';
import {
    AttractionCarousel,
    LocationTours,
    RecommendedHotels,
    AttractionDescription,
} from '@/attractions/components';
import type { FiltersRaw } from '@/app/types';
import type { AttractionName } from '@/attractions/types';

type Props = {
    attractionName: AttractionName;
    locationId?: number;
    additionalDescription?: string;
};

const props = defineProps<Props>();

const params = useParams<{ id: number }>();

const id = computed(() => {
    return props.locationId ? props.locationId : params.value.id;
});

const { data: tours, pending: toursPending } = useLazyAsyncData('location-tours', () =>
    fetchLocationTours(id.value)
);

const { data: regions, pending: regionsPending } = useLazyAsyncData('location-regions', () => {
    return props.attractionName !== 'attractions-id'
        ? fetchShortAttraction(id.value, 'populars')
        : Promise.resolve(null);
});

const query = useQuery<FiltersRaw>();

const { data: hotels, pending: hotelsPending } = useLazyAsyncData(
    'location-recommended-hotels',
    () => fetchRecommendedHotels(query.value)
);

const { data: activities, pending: activitiesPending } = useLazyAsyncData(
    'location-activities',
    () => {
        return props.attractionName !== 'attractions-id'
            ? fetchShortAttraction(id.value, 'activities')
            : Promise.resolve(null);
    }
);

const { data: attractions, pending: attractionsPending } = useLazyAsyncData(
    'location-attractions',
    () => fetchShortAttraction(id.value, 'attractions')
);

const pending = computed(
    () =>
        toursPending.value ||
        regionsPending.value ||
        hotelsPending.value ||
        attractionsPending.value ||
        activitiesPending.value
);
</script>

<template>
    <Spin v-if="pending" color="primary" class="flex-1" />
    <template v-else>
        <LocationTours
            v-if="tours?.children.length"
            :title="attractionName === 'attractions-id' ? 'Выбрать тур рядом' : 'Туры'"
            :children="tours.children"
        />
        <AttractionCarousel
            v-if="attractionName !== 'attractions-id' && regions?.length"
            type="regions"
            title="Регионы"
            :children="regions"
        />
        <RecommendedHotels
            v-if="hotels?.children.length"
            :title="
                attractionName === 'attractions-id'
                    ? 'Лучшие отели поблизости'
                    : 'Рекомендуемые отели'
            "
            :filters="hotels.filters"
            :hotels="hotels.children"
        />
        <AttractionCarousel
            v-if="attractionName !== 'attractions-id' && activities?.length"
            type="activities"
            title="События и экскурсии"
            :children="activities"
        />
        <AttractionCarousel
            v-if="attractions?.length"
            type="attractions"
            :title="
                attractionName === 'attractions-id' ? 'Что еще посмотреть' : 'Достопримечательности'
            "
            :children="attractions"
        />
        <AttractionDescription v-if="additionalDescription" :description="additionalDescription" />
    </template>
</template>
