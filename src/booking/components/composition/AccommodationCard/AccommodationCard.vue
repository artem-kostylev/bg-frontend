<script setup lang="ts">
import { BuildingsIcon, UserVisaIcon, CalendarIcon } from '@ui/icons';
import type { Accommodation } from '@/booking/types';
import { RoomCard as Room } from '@/booking/components';
import { formatDate, pluralize } from '@/app/lib';
import { Card } from '@ui/components';

type Props = {
    variant: 'composition' | 'booking' | 'extras' | 'order' | 'pay';
    accommodation: Accommodation;
    accommodationIndex?: number;
    accommodationLength?: number;
    noShadow?: boolean;
};

defineProps<Props>();

const emit = defineEmits<{
    (
        e: 'submit',
        value: {
            id: number;
            // TODO
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            selectedItems: any[];
            accommodationIndex: number;
            roomIndex: number;
        }
    ): void;
}>();

const submit = ({
    id,
    selectedItems,
    accommodationIndex,
    roomIndex,
}: {
    id: number;
    // TODO
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedItems: any[];
    accommodationIndex: number;
    roomIndex: number;
}) => {
    emit('submit', { id, selectedItems, accommodationIndex, roomIndex });
};
</script>

<template>
    <Card class="h-full" :class="noShadow && 'sm:shadow-none sm:border-1 sm:border-slate-300'">
        <div class="space-y-2.5 mb-2">
            <div class="flex items-center justify-between">
                <div class="w-full flex space-x-4">
                    <div
                        class="bg-slate-300 h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                    >
                        <BuildingsIcon width="1.2em" height="1.2em" />
                    </div>
                    <div
                        :class="[
                            'flex flex-wrap',
                            (variant === 'extras' || 'order') && 'items-center',
                            (variant === 'composition' || 'booking') && 'flex-col',
                        ]"
                    >
                        <div class="font-bold">
                            <span
                                v-if="
                                    accommodationLength !== undefined &&
                                    accommodationIndex !== undefined &&
                                    accommodationLength > 1
                                "
                                >Отель №{{ accommodationIndex + 1 }}.&#160;</span
                            >
                            <span>{{ accommodation.name }}</span>
                            <span v-if="variant !== 'composition' && variant !== 'booking'"
                                >.&#160;</span
                            >
                        </div>
                        <div>
                            <span
                                v-for="(location, index) in accommodation.location"
                                :key="location.id"
                            >
                                <span> {{ location.name }}</span>
                                <span v-if="index + 1 < accommodation.location.length"
                                    >,&#160;</span
                                >
                            </span>
                        </div>
                    </div>
                    <div
                        v-if="accommodation.location[0].visa"
                        class="flex items-center space-x-1 bg-green-600/10 px-3 py-1.5 text-green-700 self-center rounded-2xl max-h-[25px]"
                    >
                        <UserVisaIcon width="0.8em" height="0.8em" class="text-black" />
                        <span class="text-xs text-black">Visa</span>
                    </div>
                </div>
            </div>
            <div class="w-full flex space-x-4 items-center">
                <div
                    class="bg-slate-300 h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                >
                    <CalendarIcon width="1.2em" height="1.2em" />
                </div>
                <div>
                    {{ formatDate(accommodation.date_start, 'day:numeric|month:numeric') }} -
                    {{ formatDate(accommodation.date_finish) }}
                    <span
                        >({{ pluralize(accommodation.duration, ['ночь', 'ночи', 'ночей']) }})</span
                    >
                </div>
            </div>
        </div>
        <div class="flex flex-wrap -mb-5 p-1 sm:p-0">
            <div
                class="w-full flex md:flex-wrap overflow-x-auto scrollbar-hidden -mx-2.5 -mb-4 py-2"
            >
                <div
                    v-for="(room, i) in accommodation.rooms"
                    :key="room.id"
                    :class="[
                        'w-full shrink-0 px-2.5 mb-5',
                        accommodation.rooms.length === 1 &&
                            (variant === 'extras' || variant === 'order' || variant === 'pay') &&
                            'w-full sm:w-4/5 md:w-1/2',
                    ]"
                >
                    <Room
                        :variant="variant"
                        :room="room"
                        :accommodation-index="accommodationIndex"
                        :room-index="i"
                        :is-extras="variant === 'extras'"
                        :no-shadow="noShadow"
                        @submit="submit"
                    />
                </div>
            </div>
        </div>
    </Card>
</template>
