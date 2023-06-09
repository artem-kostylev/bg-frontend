<!--
<script setup lang="ts">
import { computed } from 'vue';
import type { CheckboxProps } from '@ui/components/Checkbox/checkbox';
import { defaultCheckboxProps } from '@ui/components/Checkbox/checkbox';
import type { StringOrNumber } from '@ui/types';

const props = withDefaults(defineProps<CheckboxProps>(), defaultCheckboxProps);

const emit = defineEmits<{
    (e: 'update:modelValue', value?: string | number | boolean | string[] | number[]): void;
}>();

const checked = computed(() => {
    return props.multiple
        ? (props.modelValue as StringOrNumber[] | undefined)!.includes(
              props.value as string | number
          )
        : props.modelValue === props.trueValue;
});

const change = () => {
    if (props.multiple) {
        const value = [...((props.modelValue as string[] | number[] | undefined) || '')];
        checked.value
            ? value.splice(value.indexOf(props.value as string | number), 1)
            : value.push(props.value as string | number);

        emit('update:modelValue', value.length ? value : undefined);

        return;
    }

    emit('update:modelValue', checked.value ? props.falseValue : props.trueValue);
};
</script>

<template>
    <label :class="['inline-flex align-middle', disabled && 'opacity-60 pointer-events-none']">
        <input
            type="checkbox"
            :class="[
                'focus:outline-none appearance-none transition-colors inline-block align-middle bg-origin-border select-none flex-shrink-0 w-5 h-5 text-primary-500 rounded-[7px] shadow-sm border border-slate-300',
                'checked:border-transparent checked:bg-current checked:bg-no-repeat checked:bg-center checked:checkbox-icon',
            ]"
            :checked="checked"
            :disabled="disabled"
            @change="change"
        />
        <span class="-mt-[.17rem] select-none ml-3" v-if="$slots.default">
            <slot />
        </span>
    </label>
</template>
-->
