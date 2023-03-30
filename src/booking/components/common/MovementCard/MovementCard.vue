<script setup lang="ts">
import type { Movement } from "@/booking/types";
import { Card } from "@ui/components";

type Props = {
    movement: Movement;
};

defineProps<Props>();
</script>

<template>
    <Card>
        <div v-for="(company, index) in movement.transport_company" :key="index">
            {{ company.name }}
        </div>
        <slot name="footer" />
    </Card>
</template>
