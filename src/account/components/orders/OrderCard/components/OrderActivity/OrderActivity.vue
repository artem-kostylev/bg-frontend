<script setup lang="ts">
import type { ExtraActivity } from '@/booking/types';
import { PyramidIcon } from '@ui/icons';

type Props = {
    activities: ExtraActivity[];
};

defineProps<Props>();
</script>

<template>
    <div v-if="activities?.length" class="flex space-x-2 items-center">
        <div class="rounded-md bg-secondary-200 p-1">
            <PyramidIcon width="1.2em" height="1.2em" class="shrink-0" />
        </div>
        <div>Экскурсия</div>
    </div>
</template>
