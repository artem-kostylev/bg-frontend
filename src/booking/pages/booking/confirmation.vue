<script setup lang="ts">
import { useLazyAsyncData } from "#imports";
import { useQuery } from "@/app/composables";
import { Page } from "@/app/components";
import type { FetchConfirmationQuery } from "@/booking/services";
import { fetchConfirmation } from "@/booking/services";
import { Selected } from "@/booking/components";

const query = useQuery<FetchConfirmationQuery>();

const { data, pending } = useLazyAsyncData("booking-confirmation", () =>
    fetchConfirmation(query.value)
);

const meta = {
    title: "Оформление тура",
    description: "Описание страницы оформления тура",
};
</script>

<template>
    <Page :meta="meta">
        <div v-if="pending">loading...</div>
        <div v-else-if="data">
            <Selected />
            {{ data }}
        </div>
    </Page>
</template>
