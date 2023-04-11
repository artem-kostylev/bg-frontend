<script setup lang="ts">
import type { Insurance } from "@/booking/types";
import { InsuranceBox } from "@/booking/components";

type Props = {
    insurance: Insurance;
};

defineProps<Props>();
</script>

<template>
    <InsuranceBox :insurance="insurance" />
</template>
