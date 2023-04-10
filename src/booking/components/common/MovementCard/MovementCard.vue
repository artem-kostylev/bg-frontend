<script setup lang="ts">
import type { Movement } from "@/booking/types";
import { Avatar, Card, Typography } from "@ui/components";

const STATUSES = { regular: "Регулярный", charter: "Чартерный", virtual: "Виртуальный" };

type Props = {
    movement: Movement;
};

defineProps<Props>();
</script>

<template>
    <Card>
        <template #header>
            <div
                v-for="(company, index) in movement.transport_company"
                :key="index"
                class="flex items-center space-x-4"
            >
                <Avatar
                    width="50px"
                    height="50px"
                    :src="company.key"
                    :initials="company.name"
                    shape="rounded"
                />
                <Typography variant="h3" as="h2">{{ company.name }}</Typography>
            </div>
        </template>
        <ul class="list-disc list-inside marker:text-slate-400">
            <li>{{ STATUSES[movement.is_regular] }}</li>
            <li>{{ movement.fare.name }}</li>
        </ul>
        <template #footer>
            <slot name="footer" />
        </template>
    </Card>
</template>
