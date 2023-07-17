<script setup lang="ts">
import { defaultMenuProps, menuSizes } from './menu';
import type { MenuProps, MenuOption } from './menu';
import type { StringOrNumber, UnknownObject } from '@ui/types';
import { CheckIcon } from '@ui/icons';
import isEqual from 'lodash.isequal';
import { Typography, Divider } from '@ui/components';

const props = withDefaults(defineProps<MenuProps>(), defaultMenuProps);
const emit = defineEmits<{
    (
        e: 'update:modelValue',
        value?:
            | StringOrNumber
            | StringOrNumber[]
            | UnknownObject
            | UnknownObject[]
            | undefined
            | null
    ): void;
    (e: 'select', value: StringOrNumber | UnknownObject | undefined): void;
}>();

const selected = (option: MenuOption) => {
    const result = props.returnObject ? option : option[props.valueKey];

    if (props.multiple) {
        return props.returnObject
            ? (props.modelValue as UnknownObject[]).some(item => isEqual(item, result))
            : (props.modelValue as StringOrNumber[]).includes(result as StringOrNumber);
    }

    return props.returnObject ? isEqual(props.modelValue, result) : props.modelValue === result;
};

const select = (option: MenuOption) => {
    if (props.dropdown) return emit('select', option.value as StringOrNumber | UnknownObject);

    const result = props.returnObject ? option : option[props.valueKey];

    if (props.multiple && Array.isArray(props.modelValue)) {
        const value = [...props.modelValue];

        const index = value.findIndex(item => item === result);

        index !== -1
            ? value.splice(index, 1)
            : value.push(result as StringOrNumber | UnknownObject);

        emit('update:modelValue', value as StringOrNumber[] | UnknownObject[]);
        return;
    }

    emit(
        'update:modelValue',
        props.modelValue === result ? undefined : (result as StringOrNumber | UnknownObject)
    );
};
</script>

<template>
    <div class="py-1 bg-white">
        <template v-if="options?.length">
            <template v-for="(item, index) in options" :key="item[valueKey] || index">
                <template v-if="item.children">
                    <Divider v-if="index !== 0" class="mt-1" />
                    <div :class="menuSizes[size]">
                        <Typography variant="description">
                            {{ item[labelKey] }}
                        </Typography>
                    </div>
                    <button
                        v-for="child in item.children"
                        :key="child[valueKey]"
                        type="button"
                        :tabindex="selected(child) ? '-1' : '0'"
                        @click="select(child)"
                        :aria-selected="selected(child)"
                        :class="[
                            'hover:bg-secondary-100 flex flex-col w-full whitespace-nowrap',
                            menuSizes[size],
                            selected(child) && 'bg-secondary-50 hover:bg-secondary-50',
                        ]"
                    >
                        <div class="flex items-center justify-between flex-1 w-full">
                            <div class="truncate">{{ child[labelKey] }}</div>
                            <CheckIcon
                                :class="[
                                    'ml-4 text-primary-500',
                                    selected(child) ? 'visible' : 'invisible',
                                ]"
                                width="1em"
                                height="1em"
                            />
                        </div>
                        <div
                            v-if="child[descriptionKey]"
                            class="truncate text-secondary-500 text-sm max-w-full"
                        >
                            {{ child[descriptionKey] }}
                        </div>
                    </button>
                </template>
                <template v-else>
                    <button
                        type="button"
                        :tabindex="selected(item) ? '-1' : '0'"
                        @click="select(item)"
                        :aria-selected="selected(item)"
                        :class="[
                            'hover:bg-secondary-100 flex flex-col w-full whitespace-nowrap',
                            `px-4 py-1.5`,
                            selected(item) && 'bg-secondary-50 hover:bg-secondary-50',
                        ]"
                    >
                        <div class="flex items-center justify-between w-full">
                            <div class="truncate">{{ item[labelKey] }}</div>
                            <CheckIcon
                                :class="[
                                    'ml-4 text-primary-500',
                                    selected(item) ? 'visible' : 'invisible',
                                ]"
                                width="1em"
                                height="1em"
                            />
                        </div>
                        <div
                            v-if="item[descriptionKey]"
                            class="truncate text-secondary-500 text-sm"
                        >
                            {{ item[descriptionKey] }}
                        </div>
                    </button>
                </template>
            </template>
        </template>
        <slot v-else name="empty" />
    </div>
</template>
