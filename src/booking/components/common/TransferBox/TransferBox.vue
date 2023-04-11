<script setup lang="ts">
import { pluralize } from "@/app/lib";
import { Card, Typography } from "@ui/components";
import type { Transfer } from "@/booking/types";

type Props = {
    transfer: Transfer;
    showName?: boolean;
};

withDefaults(defineProps<Props>(), {
    showName: true,
});
</script>

<template>
    <Card footer-class="md:items-end">
        <template v-if="showName" #header>
            <Typography variant="h3" as="h3">{{ transfer.route }}</Typography>
        </template>
        <div class="mb-4" v-if="showName">
            {{ transfer.name }}
        </div>
        <ul class="list-disc list-inside marker:text-slate-400">
            <li>{{ transfer.type }}</li>
            <li>{{ transfer.vehicle }}</li>
            <li>{{ pluralize(transfer.capacity, ["пассажир", "пассажира", "пассажиров"]) }}</li>
        </ul>
        <template #footer>
            <slot name="footer" />
        </template>
    </Card>
</template>
