<script setup lang="ts">
import { definePageMeta } from "#imports";
import { useParams } from "@/app/composables";
import { ToursExcursionContainer } from "@/tours/components";

definePageMeta({
    validate: ({ params }) => /^\d+$/.test(params.id as string),
});

const params = useParams<{ id: string }>();
</script>

<template>
    <ToursExcursionContainer :id="params.id" />
</template>
