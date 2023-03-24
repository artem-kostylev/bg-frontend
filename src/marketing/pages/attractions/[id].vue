<script setup lang="ts">
import { useLazyAsyncData } from "#imports";
import { useParams } from "@/app/composables";
import { Spin, Typography } from "@ui/components";
import { Page, LocationList } from "@/app/components";
import { fetchAttraction } from "@/marketing/services";

const params = useParams<{ id: string }>();

const { data, pending } = useLazyAsyncData("attraction", () => fetchAttraction(params.value.id));
</script>

<template>
    <div>
        <Page :meta="data?.meta">
            <Spin v-if="pending" color="primary" />
            <template v-else-if="data">
                <Typography variant="h1" as="h1" class="mb-1">
                    {{ data.attraction.name }}
                </Typography>
                <LocationList :location="data.attraction.location" />
            </template>
        </Page>
    </div>
</template>
