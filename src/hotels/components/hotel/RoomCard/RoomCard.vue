<script setup lang="ts">
import type { Room } from "@/hotels/types";
import { Button, Card, CardBody } from "@ui/components";
import { formatCurrency } from "@/app/lib";
import { useRoomsStore } from "@/hotels/stores";

type Props = {
    room: Room;
    isLastGroup: boolean | null;
};

defineProps<Props>();

const roomsStore = useRoomsStore();
const { selectDates } = roomsStore;
</script>

<template>
    <Card>
        <CardBody>
            {{ room.name }}
            <div v-for="food in room.food" :key="food.id">
                {{ food.name }}
                <Button @click="selectDates(food.dates, isLastGroup)">
                    {{ formatCurrency(food.price) }}
                </Button>
            </div>
        </CardBody>
    </Card>
</template>
