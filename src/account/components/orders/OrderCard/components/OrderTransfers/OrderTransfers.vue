<script setup lang="ts">
import { computed } from 'vue';
import type { Transfer } from '@/booking/types';
import { BusIcon } from '@ui/icons';

type Props = {
    transfers: Transfer[];
};

const props = defineProps<Props>();

const routes = computed(() => {
    return props.transfers.map((item: Transfer) => item.route).join(', ');
});
</script>

<template>
    <div v-if="transfers?.length" class="flex space-x-2 items-center">
        <div class="rounded-md bg-secondary-200 p-1">
            <BusIcon width="1.2em" height="1.2em" class="shrink-0" />
        </div>
        <div>Трансфер: {{ routes }}</div>
    </div>
</template>
