<script setup lang="ts">
import type { Room } from "@/hotels/types";
import { Button, Card, CardBody, Typography } from "@ui/components";
import { formatCurrency } from "@/app/lib";
import { useRoomsStore } from "@/hotels/stores";

type Props = {
    room: Room;
    isLastGroup: boolean;
};

defineProps<Props>();

const roomsStore = useRoomsStore();
const { selectDates } = roomsStore;
</script>

<template>
    <Card>
        <CardBody>
            <Typography variant="h4" as="h3">{{ room.name }}</Typography>
            <div v-for="food in room.food" :key="food.id">
                {{ food.name }}
                <Button @click="selectDates(food.dates, isLastGroup)">
                    {{ formatCurrency(food.price) }}
                </Button>
            </div>
        </CardBody>
    </Card>
</template>
