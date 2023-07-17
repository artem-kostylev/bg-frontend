<script setup lang="ts">
import { computed } from 'vue';
import { Modal } from '@ui/components';

type Props = {
    title: string;
    modelValue: boolean;
};

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();

const value = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
});
</script>

<template>
    <Modal v-model="value" size="auto" :title="title" placement="bottom">
        <template #trigger="{ vbind }">
            <slot name="trigger" :vbind="vbind" />
        </template>
        <slot />
    </Modal>
</template>
