<script setup lang="ts">
import { useLazyAsyncData } from "#imports";
import { useQuery } from "@/app/composables";
import { Page } from "@/app/components";
import type { FetchConfirmationQuery } from "@/booking/services";
import { fetchConfirmation } from "@/booking/services";
import { Selected } from "@/booking/components";
import { Spin, Typography } from "@ui/components";

const query = useQuery<FetchConfirmationQuery>();

const { data, pending } = useLazyAsyncData("booking-confirmation", () =>
    fetchConfirmation(query.value)
);

const meta = {
    title: "Оформление",
    description: "Описание страницы оформления",
};
</script>

<template>
    <Page :meta="meta">
        <Spin v-if="pending" color="primary" />
        <div v-else-if="data">
            <Typography variant="h1" as="h1">Оформление</Typography>
            <Selected v-bind="data" class="my-4 md:my-6" />
        </div>
    </Page>
</template>
