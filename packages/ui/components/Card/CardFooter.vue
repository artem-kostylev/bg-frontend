<template>
    <div class="card__footer">
        <slot />
    </div>
</template>

<style lang="postcss">
.card__footer {
    @apply p-5 flex items-center justify-between;
}

.card__footer > .typography:first-child {
    @apply -mt-1;
}

.card__footer > .typography:last-child {
    @apply -mb-1;
}
</style>
