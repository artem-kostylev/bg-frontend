<script setup lang="ts">
import { computed } from 'vue';
import { Image } from '@ui/components';
import type { AvatarProps } from '@ui/components/Avatar/avatar';
import { avatarDefaultProps } from '@ui/components/Avatar/avatar';

const props = withDefaults(defineProps<AvatarProps>(), avatarDefaultProps);

const letters = computed(() => {
    if (!props.initials) return;

    return props.initials
        .split(' ')
        .map(item => item.charAt(0).toUpperCase())
        .splice(0, 2)
        .join('');
});
</script>

<template>
    <div
        :class="[
            'inline-flex items-center justify-center bg-secondary-200 overflow-hidden',
            shape === 'rounded' && 'rounded-xl',
            shape === 'square' && 'rounded-full',
        ]"
        :style="{ width, height }"
    >
        <Image v-if="src" :src="src" :alt="letters" class="w-full h-full object-cover" />
        <div v-else class="text-secondary-500 font-medium">{{ letters }}</div>
    </div>
</template>
