<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useScrollLock, onClickOutside } from "@vueuse/core";
import { Overlay, Card, Typography } from "@ui/components";
import { XIcon } from "@ui/icons";

const sizes = {
    sm: "max-w-xs",
    md: "max-w-lg",
    lg: "max-w-3xl",
    xl: "max-w-7xl",
};

type Props = {
    modelValue?: boolean | null;
    scrollable?: boolean;
    size?: keyof typeof sizes;
    title?: string;
    loading?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
    size: "md",
    title: "",
    modelValue: null,
});

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
    (e: "open"): void;
    (e: "close"): void;
}>();

const isLocked = useScrollLock(document.body);

const open = ref(false);
const target = ref<HTMLDivElement>();

const visible = computed(() => props.modelValue || open.value);

const show = () => {
    props.modelValue === null ? (open.value = true) : emit("update:modelValue", true);
    emit("open");
};

const hide = () => {
    props.modelValue === null ? (open.value = false) : emit("update:modelValue", false);
    emit("close");
};

watch(visible, value => (isLocked.value = value));

onClickOutside(target, () => {
    hide();
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
            enter-to-class="translate-x-0"
            leave-active-class="transform ease-in duration-200"
            leave-from-class="translate-y-0"
            leave-to-class="translate-y-14"
        >
            <div
                ref="target"
                class="fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto"
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
                        :class="[
                            'w-full pointer-events-auto',
                            scrollable && 'max-h-full overflow-hidden',
                        ]"
                        header-class="-my-2"
                        :body-class="scrollable && 'overflow-y-auto'"
                    >
                        <template #header>
                            <div class="flex items-center justify-between">
                                <Typography variant="h3">
                                    {{ title }}
                                </Typography>
                                <button
                                    @click="hide"
                                    class="text-slate-500 p-2 -mr-2 hover:bg-slate-200 transition-colors rounded-full"
                                >
                                    <XIcon width="1.4em" height="1.4em" />
                                </button>
                            </div>
                        </template>
                        <slot />
                    </Card>
                </div>
            </div>
        </Transition>
    </Overlay>
</template>
