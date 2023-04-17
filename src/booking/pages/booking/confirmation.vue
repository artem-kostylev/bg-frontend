<script setup lang="ts">
import { reactive } from "vue";
import { whenever } from "@vueuse/core";
import { useLazyAsyncData } from "#imports";
import { useQuery } from "@/app/composables";
import { Page } from "@/app/components";
import type { FetchConfirmationQuery } from "@/booking/services";
import { fetchConfirmation } from "@/booking/services";
import { Selected } from "@/booking/components";
import { Card, Collapse, Grid, Spin, Typography } from "@ui/components";

type Entity = {
    label: string;
    form: { service_insurance_id: number };
    tour_id: string;
};

type Form = {
    clientId: number | null;
    entities: Entity[];
};

const query = useQuery<FetchConfirmationQuery>();

const { data, pending } = useLazyAsyncData("booking-confirmation", () =>
    fetchConfirmation(query.value)
);

const form = reactive<Form>({
    clientId: null,
    entities: [],
});

const meta = {
    title: "Оформление",
    description: "Описание страницы оформления",
};

whenever(data, value => {
    form.entities = value.general.groups.flatMap(({ tourists, tour_id }) =>
        tourists.map(({ description }) => ({
            label: description,
            form: {
                service_insurance_id: value.insurances[0].id,
            },
            tour_id,
        }))
    );
});
</script>

<template>
    <Page :meta="meta">
        <Spin v-if="pending" color="primary" />
        <Grid gap="5" v-else-if="data">
            <Typography variant="h1" as="h1">Оформление</Typography>
            <Selected v-bind="data" />
            <Typography variant="h2" as="h2">Анкеты туристов</Typography>
            <Collapse v-for="(entity, index) in form.entities" :title="entity.label" :key="index">
                <Card>qweqeq</Card>
            </Collapse>
        </Grid>
    </Page>
</template>
