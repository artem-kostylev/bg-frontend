<script setup lang="ts">
import { Card, Typography, Button } from "@ui/components";
import { PencilIcon } from "@ui/icons";
import type { Transfer } from "@/booking/types";
import { pluralize } from "~/lib";

type Props = {
    transfer: Transfer;
};

defineProps<Props>();
</script>

<template>
    <div>
        <Card footer-class="md:items-end">
            <template #header>
                <Typography variant="h3" as="h3">{{ transfer.route }}</Typography>
            </template>
            <div class="mb-4">
                {{ transfer.name }}
            </div>
            <ul class="list-disc list-inside marker:text-slate-400">
                <li>{{ transfer.type }}</li>
                <li>{{ transfer.vehicle }}</li>
                <li>{{ pluralize(transfer.capacity, ["пассажир", "пассажира", "пассажиров"]) }}</li>
            </ul>
            <template #footer>
                <Button :start-icon="PencilIcon">Изменить</Button>
            </template>
        </Card>
    </div>
</template>
