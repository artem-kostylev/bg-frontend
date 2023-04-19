<script setup lang="ts">
type Props = {
    text?: string | number;
};

defineProps<Props>();
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
        <text
            v-if="text"
            x="10.5"
            y="15"
            text-anchor="middle"
            fill="currentColor"
            class="text-xs font-semibold"
        >
            {{ text }}
        </text>
        <path
            d="M8.09082 3.43843L3.09088 3.43843C1.98629 3.43843 1.09085 4.33389 1.09088 5.43849L1.09119 16.2681C1.09122 17.3726 1.98664 18.268 3.09118 18.268L3.44144 18.268M8.09082 3.43843V1.86035C8.09082 1.30807 8.53854 0.860352 9.09082 0.860352H12.4629C13.0152 0.860352 13.4629 1.30807 13.4629 1.86035V3.43843M8.09082 3.43843H13.4629M13.4629 3.43843H18.0909C19.1954 3.43843 20.0908 4.33382 20.0909 5.43837L20.0912 16.268C20.0912 17.3725 19.1958 18.268 18.0912 18.268H17.4221M3.44144 18.268H17.4221M3.44144 18.268V18.7878M17.4221 18.268V18.7878"
            stroke="currentColor"
            stroke-linecap="round"
        />
    </svg>
</template>
