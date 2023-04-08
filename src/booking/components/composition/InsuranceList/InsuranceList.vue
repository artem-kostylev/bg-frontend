<script setup lang="ts">
import type { Insurance } from "@/booking/types";
import { Typography, Grid } from "@ui/components";
import { InsuranceCard } from "@/booking/components";

type Props = {
    insurances: Insurance[];
};

defineProps<Props>();
</script>

<template>
    <div>
        <Typography variant="h2" as="h2" class="mb-4">Страховка</Typography>
        <Grid>
            <InsuranceCard
                v-for="insurance in insurances"
                :key="insurance.id"
                :insurance="insurance"
            />
        </Grid>
    </div>
</template>
