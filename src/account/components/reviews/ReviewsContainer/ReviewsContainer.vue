<script setup lang="ts">
import { Grid } from '@ui/components';
import type { AccountReview } from '@/account/types';

type Props = {
    reviews: AccountReview[];
};

defineProps<Props>();
</script>

<template>
    <div>
        <Grid cols="2" gap="5"> </Grid>
    </div>
</template>
