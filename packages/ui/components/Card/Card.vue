<template>
    <div class="card">
        <slot />
    </div>
</template>

<style lang="postcss">
.card {
    @apply relative w-full rounded-xl flex flex-col bg-white shadow-primary overflow-hidden;
}
</style>
