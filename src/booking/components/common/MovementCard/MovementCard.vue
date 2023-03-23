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
        {{ movement.transport_company }}
        <slot name="footer" />
    </Card>
</template>
