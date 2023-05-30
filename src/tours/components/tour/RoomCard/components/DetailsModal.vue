<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import { clearNuxtData, computed, useLazyAsyncData } from '#imports';
import { fetchRoom } from '@/tours/services';
import { Modal, Tooltip, Divider } from '@ui/components';
import FacilityList from './FacilityList.vue';
import { InfoIcon } from '@ui/icons';
import { formatView } from '@/tours/lib';
import { formatList, pluralize } from '@/app/lib';

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
            <button v-bind="vbind" class="text-secondary-500">
                <Tooltip text="Подробная информация">
                    <template #trigger="slotProps">
                        <InfoIcon v-bind="slotProps.vbind" width="1.4em" height="1.4em" />
                    </template>
                </Tooltip>
            </button>
        </template>
        <template v-if="data">
            <div class="space-y-5">
                <FacilityList :facilities="data.facilities" />
                <div class="space-y-1.5">
                    <div v-if="data.size">
                        <span class="font-semibold">Площадь</span>: {{ data.size }} м²
                    </div>
                    <div v-if="data.views?.length">
                        <span class="font-semibold">Вид из номера</span>:
                        {{ formatView(data.views) }}
                    </div>
                    <div v-if="roomLocation">
                        <span class="font-semibold">Здание, в котором находится номер</span>:
                        {{ roomLocation }}
                    </div>
                    <div v-if="data.rooms">
                        <span class="font-semibold">Количество комнат</span>: {{ data.rooms }}
                    </div>
                    <div v-if="data.max_number_of_tourists">
                        <span class="font-semibold">Вместимость</span>: до
                        {{
                            pluralize(data.max_number_of_tourists, [
                                'человека',
                                'человек',
                                'человек',
                            ])
                        }}
                    </div>
                    <div v-if="data.facilities_for_description?.length">
                        <div class="font-semibold mb-1">Услуги и удобства:</div>
                        <ul
                            class="list-disc list-inside marker:text-secondary-400 grid grid-cols-2"
                        >
                            <li
                                v-for="(facility, index) in data.facilities_for_description"
                                :key="index"
                            >
                                {{ facility }}
                            </li>
                        </ul>
                    </div>
                </div>
                <template v-if="data.description">
                    <Divider dashed />
                    <div>{{ data.description }}</div>
                </template>
            </div>
        </template>
    </Modal>
</template>
