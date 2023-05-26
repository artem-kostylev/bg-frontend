<script setup lang="ts">
import { IconFilled, OrderedList, Card } from '@ui/components';
import { UsersIcon, ArmchairLampIcon, CutleryIcon } from '@ui/icons';
import type { RoomCard } from '@/booking/types/';

type Props = {
    variant: 'composition' | 'booking' | 'extras' | 'order' | 'pay';
    room: RoomCard;
    roomIndex: number;
    isExtras?: boolean;
    accommodationIndex?: number;
    noShadow?: boolean;
};

defineProps<Props>();

// const show = ref(false);
// const selectedItems = ref(props.room.wishes);
// const sending = ref(false);

/* const items = [
    {
        label: 'День рождения',
        value: 'birthday',
    },
    {
        label: 'Молодожены',
        value: 'newlyweds',
    },
    {
        label: 'Первый этаж',
        value: 'ground_floor',
    },
    {
        label: 'Детская кроватка',
        value: 'baby_cot',
    },
    {
        label: 'Верхний этаж',
        value: 'top_floor',
    },
    {
        label: 'Две кровати',
        value: '2_beds',
    },
    {
        label: 'Большая кровать',
        value: 'large_bed',
    },
]; */

/* const emit = defineEmits<{
    (
        e: 'submit',
        value: {
            id: number;
            selectedItems: any[];
            accommodationIndex: number;
            roomIndex: number;
        }
    ): void;
}>(); */

/* const submit = ({ id, selectedItems }: { id: number; selectedItems: any[] }) => {
    if (props.accommodationIndex !== undefined && props.roomIndex !== undefined) {
        emit('submit', {
            id,
            selectedItems,
            accommodationIndex: props.accommodationIndex,
            roomIndex: props.roomIndex,
        });
    }

    show.value = false;
}; */

// TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTourists = (value: any) => {
    // TODO
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return value.map((item: any) => {
        return item.fullname ? item.fullname : item;
    });
};
</script>

<template>
    <Card class="h-full" :class="noShadow && 'sm:shadow-none sm:border-1 sm:border-slate-300'">
        <div class="space-y-5">
            <div class="font-bold -mt-2 mb-4">Номер № {{ roomIndex + 1 }}</div>
            <IconFilled
                class="whitespace-normal items-center"
                :icon="ArmchairLampIcon"
                :label="room.name"
            />
            <IconFilled
                class="whitespace-normal items-center"
                :icon="CutleryIcon"
                :label="room.board"
            />
            <div
                v-if="variant === 'order'"
                class="flex items-center space-x-4"
                :class="['room__block__item--start' && room.tourists.length > 1]"
            >
                <div
                    class="bg-slate-300 h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                >
                    <component :is="UsersIcon" width="1.2em" height="1.2em" />
                </div>
                <div class="leading-5">
                    <OrderedList v-if="room.tourists?.length" :data="getTourists(room.tourists)" />
                </div>
            </div>
            <IconFilled
                v-else-if="room.tourists"
                class="whitespace-normal items-center"
                :icon="UsersIcon"
                :label="getTourists(room.tourists).join(', ')"
            />
            <!-- <div v-if="room.wishes?.length" class="flex items-center space-x-4 room__block__item--start">
                <div class="room__block__icon">
                    <CheckListIcon width="1.2em" height="1.2em" />
                </div>
                <div class="flex flex-col">
                    <div class="room__block__text">Дополнительные услуги</div>
                    <ul class="room__block__list">
                        <li v-for="wish in room.wishes" :key="wish">
                            {{ wish }}
                        </li>
                    </ul>
                </div>
            </div> -->
        </div>
    </Card>
</template>
