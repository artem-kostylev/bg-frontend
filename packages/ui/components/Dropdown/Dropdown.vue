<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { Menu, Popover } from '@ui/components';
import type { StringOrNumber, UnknownObject } from '@ui/types';
import type { DropdownProps } from './dropdown';

const show = ref(false);

defineProps<DropdownProps>();
const emit = defineEmits<{ select: [StringOrNumber | UnknownObject | undefined] }>();

const onSelect = (value?: StringOrNumber | UnknownObject) => {
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
