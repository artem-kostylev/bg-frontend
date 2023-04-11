<script setup lang="ts">
import { Card, Typography } from "@ui/components";
import type { Insurance } from "@/booking/types";

type Props = {
    insurance: Insurance;
};

defineProps<Props>();
</script>

<template>
    <Card>
        <Typography variant="h3" as="h3" class="mb-1">{{ insurance.name }}</Typography>
        <Typography>{{ insurance.description }}</Typography>
    </Card>
</template>
