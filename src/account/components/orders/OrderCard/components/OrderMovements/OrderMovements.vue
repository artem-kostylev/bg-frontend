<script setup lang="ts">
import { computed } from 'vue';
import type { Movement } from '@/booking/types';
import { AirplaneIcon } from '@ui/icons';

type Props = {
    movements: Movement[];
};

const props = defineProps<Props>();

const directions = computed(() => {
    return props.movements.map((item: Movement) => item.direction).join(', ');
});
</script>

<template>
    <div v-if="movements?.length" class="flex space-x-2 items-center">
        <div class="rounded-md bg-secondary-200 p-1">
            <AirplaneIcon width="1.2em" height="1.2em" class="shrink-0" />
        </div>
        <div>
            <span v-if="movements[0].is_regular === 'virtual'">Рейс не конкретизирован</span>
            <span v-else>{{ directions }}</span>
        </div>
    </div>
</template>
