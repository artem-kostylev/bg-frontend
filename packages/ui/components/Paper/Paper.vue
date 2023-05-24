<script setup lang="ts">
import type { Component } from 'vue';

type Props = {
    as?: string | Component;
};

withDefaults(defineProps<Props>(), {
    as: 'div',
});
</script>

<template>
    <component :is="as" class="shadow-primary rounded-xl bg-white">
        <slot />
    </component>
</template>
