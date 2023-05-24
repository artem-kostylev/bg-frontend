<script setup lang="ts">
import { Typography } from "@ui/components";
import type { Section } from "@/pages/types";
import {
    CountryCard,
    PromotionCard,
    RecommendedTourCard,
    RecommendedHotelCard,
} from "@/pages/components";

type Props = {
    sections: Section[];
};

defineProps<Props>();

const types = {
    standart_block_1: "grid-cols-1",
    standart_block_3: "grid-cols-3 gap-5",
    hotel_block_3: "grid-cols-3 gap-5",
};

const components = {
    standart_block_1: PromotionCard,
    standart_block_3: RecommendedTourCard,
    hotel_block_3: RecommendedHotelCard,
};
</script>

<template>
    <div class="grid gap-8">
        <div v-for="(section, index) in sections" :key="`section-${index}`">
            <Typography variant="h2" as="h2" class="mb-4">{{ section.name }}</Typography>
            <div :class="['grid', types[section.type]]">
                <component
                    v-for="(child, idx) in section.children"
                    :key="idx"
                    :is="components[section.type]"
                    :child="child"
                />
                <div
                    v-if="section.type === 'location_5'"
                    class="flex flex-wrap justify-between gap-y-2"
                >
                    <CountryCard
                        v-for="location in section.children"
                        :key="location"
                        :data="location"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
