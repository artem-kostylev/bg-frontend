<script setup lang="ts">
import { definePageMeta } from "#imports";
import { useParams } from "@/app/composables";
import { ToursExcursionContainer } from "@/tours/components";

definePageMeta({
    validate: ({ params }) => /^\d+$/.test(params.id as string),
});

const params = useParams<{ id: string }>();

/**
 * TODO: Обьединить кодовую базу с мультитурами
 * ToursExcursionContainer и ToursMultiContainer в ToursPackageContainer
 * а так-же fetchToursMulti и fetchToursExcursion в fetchToursPackage и подставлять нужный урл
 */
</script>

<template>
    <ToursExcursionContainer :id="params.id" />
</template>
