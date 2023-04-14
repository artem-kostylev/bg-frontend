<script setup lang="ts">
type Props = {
    dashed?: boolean;
};

defineProps<Props>();
</script>

<template>
    <div :class="['w-full h-0 border-t border-slate-200', dashed && 'border-dashed']"></div>
</template>
