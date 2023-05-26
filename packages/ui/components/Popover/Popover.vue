<script setup lang="ts">
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useFloating, offset, flip, shift } from '@floating-ui/vue';
import { Paper } from '@ui/components';
import type { PopoverProps } from './popover';
import { defaultPopoverProps } from './popover';

const props = withDefaults(defineProps<PopoverProps>(), defaultPopoverProps);
const emit = defineEmits<{ 'update:modelValue': [boolean] }>();

const referenceRef = ref(null);
const floatingRef = ref(null);
const open = ref(false);

const visible = computed(() => {
    return props.modelValue === undefined ? open.value : props.modelValue;
});

const { floatingStyles } = useFloating(referenceRef, floatingRef, {
    open: visible,
    placement: props.placement,
    middleware: [offset(10), flip(), shift()],
});

const show = () =>
    props.modelValue === undefined ? (open.value = true) : emit('update:modelValue', true);
const hide = () =>
    props.modelValue === undefined ? (open.value = false) : emit('update:modelValue', false);
const toggle = () => (visible.value ? hide() : show());

const vbind = { ref: referenceRef, onClick: toggle };

onClickOutside(floatingRef, hide, { ignore: [referenceRef] });
</script>

<template>
    <slot name="trigger" v-bind="{ vbind }" />
    <Teleport to="body">
        <Transition
            appear
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
        >
            <div v-if="visible" class="relative">
                <Paper ref="floatingRef" class="overflow-hidden" :style="floatingStyles">
                    <slot />
                </Paper>
            </div>
        </Transition>
    </Teleport>
</template>
