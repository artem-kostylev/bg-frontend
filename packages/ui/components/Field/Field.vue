<script setup lang="ts">
import type { FieldProps } from './field';

defineProps<FieldProps>();
</script>

<template>
    <div class="w-full">
        <label v-if="label" class="block mb-1.5" :for="name">
            <span>{{ label }}</span>
            <span v-if="required" class="text-danger-600">&nbsp;*</span>
        </label>
        <slot />
        <span v-if="typeof error === 'string'" class="text-danger-500 text-sm mt-1.5">
            {{ error }}
        </span>
        <span v-else-if="typeof success === 'string'" class="text-success-600 text-sm mt-1.5">
            {{ success }}
        </span>
        <span v-else-if="hint" class="text-secondary-500 text-sm mt-1.5">{{ hint }}</span>
    </div>
</template>
