<script setup lang="ts">
import { Grid } from "@ui/components";
import type { Transfer } from "@/booking/types";
import { TransferCard } from "@/booking/components";

type Props = {
    transfers: Transfer[];
};

defineProps<Props>();
</script>

<template>
    <Grid cols="2" gap="5">
        <TransferCard v-for="(transfer, index) in transfers" :key="index" :transfer="transfer" />
    </Grid>
</template>
