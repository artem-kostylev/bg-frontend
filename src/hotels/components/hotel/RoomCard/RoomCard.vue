<script setup lang="ts">
import { Button } from "@ui/components";
import { Room } from "@/hotels/types";
import { formatCurrency } from "@/app/lib";
import { useRooms } from "@/hotels/stores";

type Props = {
    room: Room;
    isLastGroup: boolean | null;
};

defineProps<Props>();

const roomsStore = useRooms();
const { selectDates } = roomsStore;
</script>

<template>
    <div class="border border-slate-300 p-5">
        <div v-for="food in room.food" :key="food.id">
            {{ food.name }}
            <Button @click="selectDates(food.dates, isLastGroup)">
                {{ formatCurrency(food.price) }}
            </Button>
        </div>
    </div>
</template>
