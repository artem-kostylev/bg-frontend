<script setup lang="ts">
import { onBeforeUnmount } from "vue";
import { clearNuxtData, computed, useLazyAsyncData } from "#imports";
import { fetchRoom } from "@/tours/services";
import { Modal, Tooltip } from "@ui/components";
import FacilityList from "./FacilityList.vue";
import { InfoIcon } from "@ui/icons";
import { formatView } from "@/tours/lib";
import { formatList, pluralize } from "@/app/lib";

type Props = {
    id: number;
};

const props = defineProps<Props>();

const { data, pending, execute } = useLazyAsyncData(`room-${props.id}`, () => fetchRoom(props.id), {
    server: false,
    immediate: false,
});

const open = () => !data.value && execute();

onBeforeUnmount(() => clearNuxtData(`room-${props.id}`));

const roomLocation = computed(() => {
    const list = data.value?.room_location.map(location => location.label);

    return list && formatList(list);
});
</script>

<template>
    <Modal :loading="pending" @open="open" size="2xl" :title="data?.name">
        <template #trigger="{ vbind }">
            <button v-bind="vbind" class="text-slate-500">
                <Tooltip text="Подробная информация">
                    <template #trigger="slotProps">
                        <InfoIcon v-bind="slotProps.vbind" width="1.4em" height="1.4em" />
                    </template>
                </Tooltip>
            </button>
        </template>
        <div v-if="data" class="space-y-3.5">
            <FacilityList :facilities="data.facilities" />
            <div class="space-y-1.5">
                <div v-if="data.size">Площадь — {{ data.size }} м²</div>
                <div v-if="data.views?.length">Вид из номера — {{ formatView(data.views) }}</div>
                <div v-if="roomLocation">
                    Здание, в котором находится номер — {{ roomLocation }}
                </div>
                <div v-if="data.rooms">Количество комнат — {{ data.rooms }}</div>
                <div v-if="data.max_number_of_tourists">
                    Вместимость — до
                    {{ pluralize(data.max_number_of_tourists, ["человека", "человек", "человек"]) }}
                </div>
                <div v-if="data.facilities_for_description?.length">
                    <div class="mb-2">Услуги и удобства:</div>
                    <ul class="list-disc list-inside marker:text-slate-400 grid grid-cols-2">
                        <li
                            v-for="(facility, index) in data.facilities_for_description"
                            :key="index"
                        >
                            {{ facility }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </Modal>
</template>
