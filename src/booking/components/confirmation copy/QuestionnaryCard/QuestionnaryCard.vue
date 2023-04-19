<script setup lang="ts">
import { Card } from "@ui/components";
import type { Questionnary } from "@/booking/types";
import { reactive } from "vue";

type Props = {
    questionnary: Questionnary;
};

defineProps<Props>();

const form = reactive({
    first_name: "",
    last_name: "",
});
</script>

<template>
    <Card>
        <input v-model="form.first_name" />
        <input v-model="form.last_name" />
    </Card>
</template>
