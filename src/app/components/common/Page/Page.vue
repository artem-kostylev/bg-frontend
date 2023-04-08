<script setup lang="ts">
import { computed } from "vue";
import { useSeoMeta } from "#imports";
import type { UseSeoMetaInput } from "unhead";
import type { Meta } from "@/app/types";
import { Container } from "@ui/components";

type Props = {
    meta?: Meta;
};

const props = withDefaults(defineProps<Props>(), {
    meta: () => ({}),
});

const meta = computed(() => {
    const { meta } = props;
    const value = { ...meta } as UseSeoMetaInput;

    meta.title && (value.ogTitle = meta.title);
    meta.description && (value.ogDescription = meta.description);

    return value;
});

useSeoMeta(meta);
</script>

<template>
    <Container class="flex flex-col w-full flex-1 py-4 md:py-8 lg:py-12">
        <slot />
    </Container>
</template>
