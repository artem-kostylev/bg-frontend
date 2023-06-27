<script setup lang="ts">
import { Grid, Alert } from '@ui/components';
import { SearchIcon } from '@ui/icons';
import type { ReviewableHotel } from '@/account/types';

type Props = {
    hotels: ReviewableHotel[] | null;
};

defineProps<Props>();
</script>

<template>
    <div>
        <div v-if="hotels?.length">
            <Grid cols="2" gap="5"> </Grid>
        </div>
        <div v-else>
            <Alert
                variant="info"
                title="У вас пока нет отелей, к которым можно оставить отзыв"
                text="Выберите место для первого путешествия с нами. По завершении вашей поездки, мы будем благодарны, если вы поделитесь своими впечатлениями об отеле."
                :start-icon="SearchIcon"
            />
        </div>
    </div>
</template>
