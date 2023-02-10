<script setup lang="ts">
import { ref, watch, computed, onBeforeUnmount } from "vue";
import { Overlay, Card, CardBody } from "@ui/components";
import { onClickOutside } from "@vueuse/core";

type Props = {
    modelValue?: boolean | null;
    placement?: "center";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    scrollable?: boolean;
    fullscreen?: boolean;
    loading?: boolean;
    persistent?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
    placement: "center",
    modelValue: null,
    size: "md",
});

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();

const show = ref(false);
const modalRef = ref();

const visible = computed(() => {
    return props.modelValue || show.value;
});

const open = () => {
    props.modelValue === null ? (show.value = true) : emit("update:modelValue", true);
};

const close = () => {
    props.modelValue === null ? (show.value = false) : emit("update:modelValue", false);
};

watch(visible, value => {
    value
        ? document?.body.classList.add("overflow-hidden")
        : document?.body.classList.remove("overflow-hidden");
});

onBeforeUnmount(() => {
    document.body.classList.remove("overflow-hidden");
});

onClickOutside(modalRef, () => {
    if (props.persistent) return;

    const elements = document.body.querySelectorAll("[data-clickoutside]");
    const lastElement = elements[elements.length - 1];

    if (modalRef.value === lastElement) close();
});

const slotProps = { onClick: open };
</script>

<template>
    <slot name="trigger" :props="slotProps" />
    <Teleport to="body">
        <Overlay :show="visible" :loading="loading">
            <div class="modal" @click.self.prevent="close">
                <div
                    :class="[
                        'modal__dialog',
                        `modal__dialog--${size}`,
                        `modal__dialog--${placement}`,
                        scrollable && 'modal__dialog--scrollable',
                        fullscreen && 'modal__dialog--fullscreen',
                    ]"
                    ref="modalRef"
                    :data-clickoutside="visible"
                >
                    <Card>
                        <CardBody>
                            <slot />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </Overlay>
    </Teleport>
</template>

<style lang="postcss">
.modal {
    @apply fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto;

    &__dialog {
        @apply relative w-auto my-5 mx-5 sm:mx-auto pointer-events-none;

        &--xs {
            @apply max-w-full sm:max-w-sm;
        }

        &--sm {
            @apply max-w-full sm:max-w-md;
        }

        &--md {
            @apply max-w-xl;
        }

        &--lg {
            @apply max-w-3xl;
        }

        &--xl {
            @apply max-w-5xl;
        }

        &--2xl {
            @apply max-w-7xl;
        }

        @media (max-width: 640px) {
            &--fullscreen {
                @apply m-0 w-screen !h-full !max-w-none;

                & .card {
                    @apply rounded-none h-full;
                }

                & .card__body {
                    @apply overflow-y-auto;
                }
            }
        }

        &--center {
            @apply flex items-center min-h-[calc(100%_-_2.5rem)];
        }

        &--scrollable {
            @apply h-[calc(100%_-_2.5rem)];

            & .card {
                @apply max-h-full;
            }

            & .card__body {
                @apply overflow-y-auto;
            }
        }
    }

    & .card {
        @apply pointer-events-auto;
    }
}
</style>
