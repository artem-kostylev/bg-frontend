<script setup lang="ts">
import { computed } from 'vue';
import type { RadioProps } from './radio';
import { defaultRadioProps } from './radio';

const props = withDefaults(defineProps<RadioProps>(), defaultRadioProps);

const emit = defineEmits<{ (e: 'update:modelValue', value?: string | number): void }>();

const checked = computed(() => {
    return props.modelValue === props.value && props.modelValue !== null && props.value !== null;
});

const change = () => {
    emit('update:modelValue', props.value);
};
</script>

<template>
    <label :class="['inline-flex align-middle', disabled && 'opacity-60 pointer-events-none']">
        <input
            type="radio"
            :class="[
                'focus:outline-none appearance-none transition-colors inline-block align-middle bg-origin-border select-none flex-shrink-0 w-5 h-5 text-primary-500 rounded-full shadow-sm border border-secondary-300',
                'focus-visible:border-primary-300 focus-visible:ring focus-visible:ring-primary-200 focus-visible:ring-opacity-50',
                'disabled:opacity-60 disabled:pointer-events-none',
                'checked:border-transparent checked:bg-current checked:bg-no-repeat checked:bg-center checked:radio-icon',
            ]"
            :value="value"
            :checked="checked"
            :disabled="disabled"
            @change="change"
        />
        <span class="-mt-[.17rem] select-none ml-3" v-if="$slots.default">
            <slot />
        </span>
    </label>
</template>
