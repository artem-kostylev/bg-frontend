<script setup lang="ts">
import { useHead } from "#imports";
import type { Meta } from "@/app/types";
import { Container } from "@ui/components";

type Props = {
    meta?: Meta;
};

const props = defineProps<Props>();

useHead({
    title: props.meta?.title,
    meta: [{ name: "description", content: props.meta?.description }],
});
</script>

<template>
    <Container>
        <slot />
    </Container>
</template>
