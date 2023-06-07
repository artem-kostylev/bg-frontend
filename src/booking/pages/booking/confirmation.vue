<script setup lang="ts">
import { useLazyAsyncData } from '#imports';
import { useQuery } from '@/app/composables';
import { Page } from '@/app/components';
import type { FetchConfirmationQuery } from '@/booking/services';
import { fetchConfirmation } from '@/booking/services';
import { Selected, QuestionnaryList } from '@/booking/components';
import { Grid, Spin, Typography } from '@ui/components';

const query = useQuery<FetchConfirmationQuery>();

const { data, pending } = useLazyAsyncData('booking-confirmation', () =>
    fetchConfirmation(query.value)
);

const meta = {
    title: 'Оформление',
    description: 'Описание страницы оформления',
};
</script>

<template>
    <Page :meta="meta">
        <Spin v-if="pending" color="primary" />
        <Grid gap="5" v-else-if="data">
            <Typography variant="h1" as="h1">Оформление</Typography>
            <Selected v-bind="data" />
            <Typography variant="h2" as="h2">Авторизация</Typography>
            <div>
                Для того чтобы заполненные ниже данные анкет сохранились в Системе, войдите в Личный
                кабинет, либо зарегистрируйтесь:
            </div>
            <QuestionnaryList v-bind="data" />
        </Grid>
    </Page>
</template>
