<script setup lang="ts">
import { onBeforeUnmount, computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { clearNuxtData, useLazyAsyncData } from '#imports';
import { useParams, useQuery } from '@/app/composables';
import { Modal, Typography, Spin, Grid } from '@ui/components';
import { RoomCard, AvailableDates, RoomFilters } from '@/tours/components';
import { fetchRooms } from '@/tours/services';
import { useRoomsStore } from '@/tours/stores';
import { Empty } from '@/app/components';
import type { FetchRoomsQuery, RoomAggregations } from '@/tours/services';

const params = useParams<{ id: string }>();
const query = useQuery<FetchRoomsQuery>();

const roomsStore = useRoomsStore();
const { currentGroupIndex, openModal } = storeToRefs(roomsStore);

const filters = ref<RoomAggregations>({
    duration: [],
    begin_date: [],
});

const roomAggregations = ref<RoomAggregations | null>(null);

const getRooms = async () => {
    const response = await fetchRooms(Number(params.value.id), query.value, filters.value);
    const { aggregations } = response.groups[0];

    !roomAggregations.value && (roomAggregations.value = aggregations);

    const { begin_date, duration } = aggregations;

    filters.value.begin_date = [begin_date[0], begin_date[begin_date.length - 1]];
    filters.value.duration = [duration[0], duration[duration.length - 1]];

    return response;
};

const { data, pending, error, execute } = useLazyAsyncData('rooms', () => getRooms(), {
    server: false,
});

const isLastGroup = computed(() => {
    return currentGroupIndex.value + 1 === data.value?.groups.length;
});

const title = computed(() => {
    if (!data.value || data.value.groups.length === 1) return 'Номера';
    return `Номера для ${currentGroupIndex.value + 1} группы`;
});

const hasNext = computed(() => {
    if (!data.value) return false;

    return query.value.hotel_ids
        ? data.value.general.qty_hotels >= query.value.hotel_ids.length + 1
        : false;
});

onBeforeUnmount(() => {
    roomsStore.$reset();
    clearNuxtData('rooms');
});
</script>

<template>
    <div>
        <div class="flex flex-wrap items-center -mx-5 -mb-5">
            <div class="px-5 flex-1 mb-5">
                <Typography variant="h2" as="h2">{{ title }}</Typography>
            </div>
            <div class="px-5 w-full md:w-auto mb-5">
                <RoomFilters
                    v-if="data"
                    v-model="filters"
                    @update:model-value="execute()"
                    :aggregations="roomAggregations"
                />
            </div>
        </div>
        <Spin v-if="pending" class="py-5 flex-1" color="primary" />
        <Empty
            v-else-if="error"
            title="Что-то пошло не так"
            description="Ошибка получения данных, попробуйте повторить запрос позже"
        />
        <div v-else-if="data" class="py-5">
            <template v-for="(group, index) in data.groups" :key="index">
                <Transition
                    mode="out-in"
                    enter-active-class="transform transition ease-in-out duration-500"
                    enter-from-class="translate-x-1/2"
                    enter-to-class="translate-x-0"
                >
                    <template v-if="currentGroupIndex === index">
                        <Grid cols="3" gap="5" v-if="group.rooms.length">
                            <RoomCard
                                v-for="room in group.rooms"
                                :key="room.id"
                                :room="room"
                                :is-last-group="isLastGroup"
                            />
                        </Grid>
                        <Empty
                            v-else
                            title="По вашему запросу ничего не нашлось"
                            description="Попробуйте скорректировать поиск, изменив регион, даты заезда и выезда, количество гостей или фильтры"
                        />
                    </template>
                </Transition>
            </template>
            <Modal v-model="openModal" title="Даты проживания и количество ночей">
                <AvailableDates :has-movements="!!data.general.qty_movements" :has-next="hasNext" />
            </Modal>
        </div>
    </div>
</template>
