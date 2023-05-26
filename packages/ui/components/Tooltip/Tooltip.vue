<script setup lang="ts">
import { computed, ref } from 'vue';
import { useFloating, offset, flip, shift } from '@floating-ui/vue';
import { tooltipDefaultProps } from '@ui/components/Tooltip/tooltip';
import type { TooltipProps } from '@ui/components/Tooltip/tooltip';

const props = withDefaults(defineProps<TooltipProps>(), tooltipDefaultProps);

const open = ref(false);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const referenceRef = ref<HTMLElement | null | any>(null);
const floatingRef = ref<HTMLElement | null>(null);

const triggerRef = computed(() => {
    if (!referenceRef.value) return;

    return referenceRef.value.ref || referenceRef.value;
});

const { x, y } = useFloating(triggerRef, floatingRef, {
    open,
    placement: props.placement,
    middleware: [offset(5), flip(), shift({ padding: 10 })],
});

const show = () => (open.value = true);
const hide = () => (open.value = false);

const vbind = { onMouseenter: show, onMouseleave: hide, ref: referenceRef };
</script>

<template>
    <slot name="trigger" :vbind="vbind" />
    <Teleport to="body">
        <Transition
            appear
            enter-active-class="transform transition ease-in-out duration-200"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transform transition ease-in-out duration-200"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div
                v-if="open"
                :style="{ top: `${y}px`, left: `${x}px` }"
                class="absolute bg-secondary-900/90 text-sm rounded-xl px-2.5 py-1.5 text-white w-max z-50"
                ref="floatingRef"
            >
                {{ text }}
            </div>
        </Transition>
    </Teleport>
</template>
