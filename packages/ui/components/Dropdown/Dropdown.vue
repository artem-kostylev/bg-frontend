<script lang="ts">
export default { inheritAttrs: true };
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { Menu, Popover } from '@ui/components';
import type { StringOrNumber } from '@ui/types';
import type { DropdownProps } from './dropdown';

const show = ref(false);

defineProps<DropdownProps>();
const emit = defineEmits<{ select: [StringOrNumber | StringOrNumber[] | undefined] }>();

const onSelect = (value?: StringOrNumber | StringOrNumber[]) => {
    emit('select', value);
    show.value = false;
};
</script>

<template>
    <Popover v-model="show" :placement="placement">
        <template #trigger="{ vbind }">
            <slot name="trigger" :vbind="vbind" />
        </template>
        <Menu :options="options" @select="onSelect" dropdown />
    </Popover>
</template>
