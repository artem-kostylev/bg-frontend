<script setup lang="ts">
import { computed } from 'vue';
import { Popover } from '@ui/components';

type Props = {
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
    <Popover v-model="value">
        <template #trigger="slotProps">
            <slot name="trigger" :props="slotProps.vbind" />
        </template>
        <slot />
    </Popover>
</template>
