<script setup lang="ts">
import type { Meta as IMeta } from "@/app/types";
import { Container } from "@ui/components";

type Props = {
    meta?: IMeta;
};

defineProps<Props>();
</script>

<template>
    <Head>
        <Title v-if="meta?.title">{{ meta?.title }}</Title>
        <Meta v-if="meta?.description" name="description" :content="meta?.description" />
    </Head>
    <Container class="grid w-full py-4 md:py-8 lg:py-12">
        <slot />
    </Container>
</template>
