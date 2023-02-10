<script setup lang="ts">
type Props = {
    padding?: boolean;
};

withDefaults(defineProps<Props>(), {
    padding: true,
});
</script>

<template>
    <div :class="['card__body', padding && 'card__body--padding']">
        <slot />
    </div>
</template>

<style lang="postcss">
.card__body {
    @apply flex-1;

    &--padding {
        @apply p-5;
    }
}

.card__body > .typography:first-child {
    @apply -mt-1;
}

.card__body > .typography:last-child {
    @apply -mb-1;
}
</style>
