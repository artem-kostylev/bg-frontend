<script setup lang="ts">
import type { Transfer } from '@/booking/types';
import { Grid } from '@ui/components';
import { AdditionalTransferCard } from '@/booking/components';

type Props = {
    transfer: Transfer;
    additionalTransfers: Transfer[];
};

defineProps<Props>();
</script>

<template>
    <Grid cols="2" gap="5">
        <AdditionalTransferCard
            v-for="additionalTransfer in additionalTransfers"
            :key="additionalTransfer.id"
            :transfer="transfer"
            :additional-transfer="additionalTransfer"
        />
    </Grid>
</template>
