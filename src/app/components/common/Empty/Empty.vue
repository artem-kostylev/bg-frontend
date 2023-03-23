<script setup lang="ts">
import { AlertOctagonIcon } from "@ui/icons";

type Props = {
    description?: string;
};

withDefaults(defineProps<Props>(), {
    description: "По вашему запросу ничего не найдено",
});
</script>

<template>
    <div class="flex flex-col items-center justify-center text-slate-500">
        <AlertOctagonIcon width="2em" height="2em" class="mb-3" stroke-width="1.3" />
        <p class="text-xl">По вашему запросу ничего не найдено</p>
    </div>
</template>
