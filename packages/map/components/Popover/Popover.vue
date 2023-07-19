<script setup lang="ts">
import { ref, computed } from 'vue';
import { onClickOutside, useVModel } from '@vueuse/core';
import type { PopoverProps } from './popover';
import { defaultPopoverProps } from './popover';

const props = withDefaults(defineProps<PopoverProps>(), defaultPopoverProps);
const emit = defineEmits<{ 'update:modelValue': [boolean] }>();

const visible = useVModel(props, 'modelValue', emit, { passive: true });

const referenceRef = ref(null);
const floatingRef = ref<HTMLElement>();

const toggle = () => (visible.value = !visible.value);
const hide = () => (visible.value = false);

const vbind = computed(() => {
    return props.trigger === 'hover'
        ? { ref: referenceRef, onMouseover: toggle, onMouseleave: hide }
        : { ref: referenceRef, onClick: toggle };
});

onClickOutside(floatingRef, () => (visible.value = false), { ignore: [referenceRef] });
</script>

<template>
    <div class="relative">
        <slot name="trigger" v-bind="{ vbind }" />
        <Transition
            appear
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
        >
            <div
                v-if="visible"
                ref="floatingRef"
                class="absolute bottom-full left-1/2 -translate-x-1/2 pb-1.5"
            >
                <slot />
            </div>
        </Transition>
    </div>
</template>
