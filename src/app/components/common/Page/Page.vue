<script setup lang="ts">
import type { Meta as IMeta } from "@/app/types";
import { Container } from "@ui/components";
import { useSeoMeta } from "#imports";

type Props = {
    meta?: IMeta;
};

const props = withDefaults(defineProps<Props>(), {
    meta: () => ({}),
});

useSeoMeta(props.meta);
</script>

<template>
    <Container class="grid w-full py-4 md:py-8 lg:py-12">
        <slot />
    </Container>
</template>
