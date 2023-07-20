<script setup lang="ts">
import { ref } from 'vue';
import { HeartIcon } from '@ui/icons';

const liked = ref(false);
</script>

<template>
    <button @click="liked = !liked">
        <HeartIcon
            width="24"
            height="24"
            :class="['fill-white/50 stroke-white', liked && 'fill-rose-700/80 stroke-rose-400']"
        />
    </button>
</template>
