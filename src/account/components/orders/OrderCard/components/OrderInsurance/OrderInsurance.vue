<script setup lang="ts">
import type { Insurance } from '@/booking/types';
import { ShieldIcon } from '@ui/icons';

type Props = {
    insurances: Insurance[];
};

defineProps<Props>();
</script>

<template>
    <div v-if="insurances?.length" class="flex space-x-2 items-center">
        <div class="rounded-md bg-secondary-200 p-1">
            <ShieldIcon width="1.1em" height="1.1em" class="shrink-0" />
        </div>
        <div>Страховка</div>
    </div>
</template>
