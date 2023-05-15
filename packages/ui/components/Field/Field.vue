<script setup lang="ts">
import type { Ref } from "vue";

type Props = {
    name?: string;
    label?: string;
    required?: boolean;
    hint?: string;
    error?: string | boolean | null | Ref<string>;
};

withDefaults(defineProps<Props>(), {
    name: "",
    label: "",
    error: "",
    hint: "",
});
</script>

<template>
    <div class="w-full">
        <label v-if="label" class="block mb-1.5" :for="name">
            <span>{{ label }}</span>
            <span v-if="required" class="text-red-600">&nbsp;*</span>
        </label>
        <slot />
        <span v-if="typeof error === 'string'" class="text-red-500 text-sm mt-1.5">
            {{ error }}
        </span>
        <span v-else-if="hint" class="text-slate-500 text-sm mt-1.5">{{ hint }}</span>
    </div>
</template>
