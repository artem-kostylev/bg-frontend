<script setup lang="ts">
type Props = {
    modelValue?: boolean;
    loading?: boolean;
};

defineProps<Props>();
const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();

const show = () => emit("update:modelValue", true);

const vbind = { onClick: show };
</script>

<template>
    <slot name="trigger" :vbind="vbind" />
    <div v-if="modelValue">
        <div v-if="loading">loading...</div>
        <slot v-else />
    </div>
</template>
