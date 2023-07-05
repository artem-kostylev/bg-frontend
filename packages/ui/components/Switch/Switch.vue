<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import { computed } from 'vue';

type Props = {
    modelValue?: boolean;
    disabled?: boolean;
    trueValue?: string | number | boolean;
    falseValue?: string | number | boolean;
};

const props = withDefaults(defineProps<Props>(), {
    trueValue: true,
    falseValue: undefined,
    disabled: false,
});

const emit = defineEmits<{ (e: 'update:modelValue', value?: string | number | boolean): void }>();

const checked = computed(() => {
    return props.modelValue === props.trueValue;
});

const change = (event: Event) => {
    const isChecked = (event.target as HTMLInputElement).checked;

    emit('update:modelValue', isChecked ? props.trueValue : props.falseValue);
};
</script>

<template>
    <label class="switch">
        <input
            v-bind="$attrs"
            :checked="checked"
            :value="modelValue"
            :disabled="disabled"
            type="checkbox"
            name="switch"
            class="switch__input"
            @change="change"
        />
        <span class="switch__label" />
    </label>
</template>
