<script setup lang="ts">
import { Card } from '@ui/components';
import type { AccountReview } from '@/account/types';

type Props = {
    reviews: AccountReview[];
};

defineProps<Props>();
</script>

<template>
    <div>
        <Card> </Card>
    </div>
</template>
