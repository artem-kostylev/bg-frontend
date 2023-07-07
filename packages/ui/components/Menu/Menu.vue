<script setup lang="ts">
import { computed } from 'vue';
import { defaultMenuProps, menuSizes } from './menu';
import type { MenuProps, MenuOption } from './menu';
import type { StringOrNumber } from '@ui/types';
import { CheckIcon } from '@ui/icons';

const props = withDefaults(defineProps<MenuProps>(), defaultMenuProps);
const emit = defineEmits<{
    'update:modelValue': [StringOrNumber | StringOrNumber[] | undefined | null];
    select: [StringOrNumber | StringOrNumber[] | undefined];
}>();

const modelValue = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
});

const selected = (option: MenuOption) => {
    if (!props.multiple) return option.value === modelValue.value;

    return (modelValue.value as StringOrNumber[]).includes(option.value);
};

const select = (option: MenuOption) => {
    if (props.dropdown) return emit('select', option.value);

    if (!props.multiple) return (modelValue.value = option.value);

    const value = [...(modelValue.value as StringOrNumber[])];

    const index = value.findIndex(item => item === option.value);
    index !== -1 ? value.splice(index, 1) : value.push(option.value);

    modelValue.value = value;
};
</script>

<template>
    <div class="py-1 bg-white">
        <button
            v-for="option in options"
            :key="option.value"
            @click="select(option)"
            :class="[
                'flex items-center w-full text-left hover:bg-secondary-100 transition-colors duration-200',
                menuSizes[size],
            ]"
        >
            <component :is="option.startIcon" width="1.1em" class="mr-3.5 text-primary-500" />
            <span class="flex-1">{{ option.label }}</span>
            <CheckIcon
                v-if="!dropdown"
                :class="!selected(option) && 'invisible'"
                width="1.1em"
                class="ml-3.5 text-primary-500"
            />
        </button>
    </div>
</template>
