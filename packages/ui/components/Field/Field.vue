<script setup lang="ts">
import type { FieldProps } from './field';

defineProps<FieldProps>();
</script>

<template>
    <div class="w-full">
        <label v-if="label" class="block mb-2" :for="name">
            <span>{{ label }}</span>
            <span v-if="required" class="text-danger-600">&nbsp;*</span>
        </label>
        <slot />
        <div v-if="typeof error === 'string'" class="text-danger-500 text-sm mt-1">
            {{ error }}
        </div>
        <div v-else-if="typeof success === 'string'" class="text-success-600 text-sm mt-1">
            {{ success }}
        </div>
        <div v-else-if="hint" class="text-secondary-500 text-sm mt-1">{{ hint }}</div>
    </div>
</template>
