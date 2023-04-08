<script setup lang="ts">
import { useLazyAsyncData } from "#imports";
import { useQuery } from "@/app/composables";
import { Page } from "@/app/components";
import { fetchComposition, type FetchCompositionQuery } from "@/booking/services";
import { Selected } from "@/booking/components";
import { Spin } from "@ui/components";

const query = useQuery<FetchCompositionQuery>();

const { data, pending } = useLazyAsyncData("booking-composition", () =>
    fetchComposition(query.value)
);

const meta = {
    title: "Состав тура",
    description: "Описание состава тура",
};
</script>

<template>
    <Page :meta="meta">
        <Spin v-if="pending" color="primary" />
        <div v-else-if="data">
            <Selected />
            {{ data }}
        </div>
    </Page>
</template>
