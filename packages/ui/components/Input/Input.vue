<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { Component, Ref } from "vue";
import { ref, computed, useAttrs } from "vue";
import { Spin } from "@ui/components";

type Props = {
    type?: "text" | "password";
    placeholder?: string;
    startIcon?: Component;
    endIcon?: Component;
    modelValue?: string | number;
    loading?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    error?: string | boolean | null | Ref<string>;
};

const props = withDefaults(defineProps<Props>(), {
    type: "text",
    placeholder: "",
    modelValue: "",
    startIcon: undefined,
    endIcon: undefined,
    error: undefined,
});

const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();

const { class: classes, ...attrs } = useAttrs();
const inputRef = ref<HTMLInputElement>();

const inputPaddingClass = computed(() => {
    const classes = [];

    props.startIcon ? classes.push("pl-10") : classes.push("pl-4");
    props.endIcon ? classes.push("pr-10") : classes.push("pr-4");

    return classes;
});

const onInput = (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    emit("update:modelValue", value);
};

const endIcon = computed(() => (props.loading ? Spin : props.endIcon));

defineExpose({ inputRef });
</script>

<template>
    <div>
        <div :class="['relative inline-flex w-full', classes]">
            <div
                v-if="startIcon"
                class="absolute inset-y-0 left-0 flex items-center justify-center pl-4 pointer-events-none"
            >
                <component :is="startIcon" width="1em" height="1em" class="text-base-500" />
            </div>
            <input
                v-bind="attrs"
                :value="modelValue"
                :type="type"
                :placeholder="placeholder"
                @input="onInput"
                :disabled="disabled"
                :readonly="readonly"
                ref="inputRef"
                :class="[
                    'inline-flex items-center bg-white border px-3.5 py-[.535rem] rounded-xl transition-colors duration-200 w-full',
                    error
                        ? 'border-red-500 hover:border-red-700 focus:border-red-700 placeholder-red-500'
                        : 'border-slate-300 hover:border-slate-500 focus:border-slate-500 placeholder-slate-500',
                    disabled && 'pointer-events-none opacity-60',
                    ...inputPaddingClass,
                ]"
            />
            <div
                v-if="endIcon"
                class="absolute inset-y-0 right-0 flex items-center justify-center pr-4 pointer-events-none"
            >
                <component :is="endIcon" width="1em" height="1em" class="text-slate-500" />
            </div>
        </div>
        <div v-if="typeof error === 'string'" class="text-red-500 text-sm mt-1">{{ error }}</div>
    </div>
</template>
