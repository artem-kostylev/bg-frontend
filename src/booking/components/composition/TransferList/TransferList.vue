<script setup lang="ts">
import type { Transfer } from "@/booking/types";
import { Typography, Grid } from "@ui/components";
import { TransferCard } from "@/booking/components";

type Props = {
    transfers: Transfer[];
};

defineProps<Props>();
</script>

<template>
    <div>
        <Typography variant="h2" as="h2" class="mb-4">Трансферы</Typography>
        <Grid cols="2">
            <TransferCard v-for="transfer in transfers" :key="transfer.id" :transfer="transfer" />
        </Grid>
    </div>
</template>
