<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useScrollLock, onClickOutside } from '@vueuse/core';
import { Overlay, Card, Typography, Image } from '@ui/components';
import { XIcon } from '@ui/icons';

const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '7xl': 'max-w-7xl',
};

type Props = {
    modelValue?: boolean | null;
    cover?: string;
    size?: keyof typeof sizes;
    title: string;
    loading?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    title: '',
    cover: '',
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
            enter-from-class="translate-y-14"
            enter-to-class="translate-y-0"
            leave-active-class="transform ease-in duration-200"
            leave-from-class="translate-y-0"
            leave-to-class="translate-y-14"
        >
            <div :class="['fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto']">
                <div
                    :class="[
                        'relative w-auto m-5 pointer-events-none sm:mx-auto',
                        'flex items-center min-h-[calc(100%-2.5rem)]',
                        sizes[size],
                    ]"
                >
                    <Card
                        ref="targetRef"
                        :data-clickoutside="visible"
                        :class="['w-full pointer-events-auto']"
                        header-class="-my-2"
                    >
                        <template #cover>
                            <div class="relative">
                                <Image :src="cover" />
                                <div
                                    class="inset-0 absolute bg-gradient-to-b from-transparent via-transparent to-secondary-900/90"
                                ></div>
                                <Typography
                                    variant="h3"
                                    class="truncate absolute bottom-0 inset-x-0 px-5 py-4 text-white"
                                >
                                    {{ title }}
                                </Typography>
                                <div class="absolute top-0 right-0 p-5">
                                    <button
                                        @click="hide"
                                        class="focus:outline-none bg-secondary-900/60 hover:bg-slate-900/70 text-white rounded-full p-2"
                                    >
                                        <XIcon width="1.4em" height="1.4em" />
                                    </button>
                                </div>
                            </div>
                        </template>
                        <slot />
                    </Card>
                </div>
            </div>
        </Transition>
    </Overlay>
</template>
