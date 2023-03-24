<script setup lang="ts">
import type { Location } from "@/app/types";
import { Typography } from "@ui/components";

type Props = {
    location: Location[];
};

defineProps<Props>();
</script>

<template>
    <div class="flex">
        <NuxtLink
            v-for="item in location"
            :key="item.id"
            :to="{ name: 'locations-id', params: { id: item.id } }"
            target="_blank"
        >
            <Typography variant="description">
                {{ item.name }}
            </Typography>
        </NuxtLink>
    </div>
</template>
