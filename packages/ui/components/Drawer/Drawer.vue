<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useScrollLock, onClickOutside } from '@vueuse/core';
import { Overlay, Card, Typography } from '@ui/components';
import { XIcon } from '@ui/icons';

const placements = {
    top: 'flex items-start min-h-full md:h-[80vh] md:min-h-[80vh]',
    bottom: 'flex items-end min-h-full',
};

type Props = {
    modelValue?: boolean | null;
    placement?: keyof typeof placements;
    title?: string;
    loading?: boolean;
    persistent?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
    placement: 'top',
    title: '',
    modelValue: null,
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'open'): void;
    (e: 'close'): void;
}>();

const isLocked = useScrollLock(document.body);

const open = ref(false);
const targetRef = ref<InstanceType<typeof Card>>();

const visible = computed(() => props.modelValue || open.value);

const show = () => {
    props.modelValue === null ? (open.value = true) : emit('update:modelValue', true);
    emit('open');
};

const hide = () => {
    props.modelValue === null ? (open.value = false) : emit('update:modelValue', false);
    emit('close');
};

watch(visible, value => (isLocked.value = value));

onClickOutside(targetRef, () => {
    if (props.persistent) return;

    const elements = document.body.querySelectorAll('[data-clickoutside]');
    const lastElement = elements[elements.length - 1];

    if (targetRef.value!.$el === lastElement) hide();
});

const vbind = { onClick: show };
</script>

<template>
    <slot name="trigger" :vbind="vbind" />
    <Overlay :show="visible" :loading="loading">
        <Transition
            appear
            enter-active-class="transform ease-out duration-300"
            enter-from-class="-translate-y-full"
            enter-to-class="translate-y-0"
            leave-active-class="transform ease-in duration-200"
            leave-from-class="translate-y-0"
            leave-to-class="-translate-y-full"
        >
            <div :class="['fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto']">
                <div
                    :class="[
                        'relative w-auto sm:mx-auto pointer-events-none h-full ',
                        placements[placement],
                    ]"
                >
                    <Card
                        ref="targetRef"
                        :data-clickoutside="visible"
                        :class="['w-full max-h-full pointer-events-auto rounded-none']"
                        header-class="-my-2"
                        body-class="overflow-y-auto"
                    >
                        <template #header>
                            <div class="flex items-center justify-between">
                                <Typography variant="h3" class="truncate">
                                    {{ title }}
                                </Typography>
                                <button
                                    @click="hide"
                                    class="text-secondary-500 p-2 -mr-2 hover:bg-secondary-200 transition-colors rounded-full"
                                >
                                    <XIcon width="1.4em" height="1.4em" />
                                </button>
                            </div>
                        </template>
                        <slot />
                        <template v-if="$slots.footer" #footer>
                            <slot name="footer" />
                        </template>
                    </Card>
                </div>
            </div>
        </Transition>
    </Overlay>
</template>
