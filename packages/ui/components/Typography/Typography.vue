<script setup lang="ts">
import type { TypographyProps } from '@ui/components/Typography/typography';
import { typographyVariants, typographyDefaultProps } from '@ui/components/Typography/typography';

withDefaults(defineProps<TypographyProps>(), typographyDefaultProps);
</script>

<template>
    <component :is="as" :class="[variant && typographyVariants[variant]]">
        <slot />
    </component>
</template>
