<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useScrollLock, onClickOutside } from '@vueuse/core';
import { Overlay, Card, Typography } from '@ui/components';
import { XIcon } from '@ui/icons';

const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '7xl': 'max-w-7xl',
};

type Props = {
    modelValue?: boolean | null;
    scrollable?: boolean;
    size?: keyof typeof sizes;
    title?: string;
    loading?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
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
const targetRef = ref<HTMLDivElement>();

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

onClickOutside(targetRef, hide);

const vbind = { onClick: show };
</script>

<template>
    <slot name="trigger" :vbind="vbind" />
    <Overlay :show="visible" :loading="loading">
        <Transition
            appear
            enter-active-class="transform ease-out duration-300"
            enter-from-class="translate-y-14"
            enter-to-class="translate-x-0"
            leave-active-class="transform ease-in duration-200"
            leave-from-class="translate-y-0"
            leave-to-class="translate-y-14"
        >
            <div
                :class="[
                    'fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto',
                    scrollable ? 'pointer-events-none' : 'pointer-events-auto',
                ]"
            >
                <div
                    :class="[
                        'relative w-auto m-5 pointer-events-none sm:mx-auto',
                        'flex items-center min-h-[calc(100%-2.5rem)]',
                        sizes[size],
                        scrollable && 'h-[calc(100%-2.5rem)]',
                    ]"
                >
                    <Card
                        ref="targetRef"
                        :class="[
                            'w-full pointer-events-auto',
                            scrollable && 'max-h-full overflow-hidden',
                        ]"
                        header-class="-my-2"
                        :body-class="scrollable && 'overflow-y-auto'"
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
