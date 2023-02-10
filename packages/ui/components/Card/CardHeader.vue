<template>
    <div class="card__header">
        <slot />
    </div>
</template>

<style lang="postcss">
.card__header {
    @apply p-5 flex items-center justify-between;
}

.card__header > .typography:first-child {
    @apply -mt-1;
}

.card__header > .typography:last-child {
    @apply -mb-1;
}
</style>
