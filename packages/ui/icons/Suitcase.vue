<script setup lang="ts">
type Props = {
    text?: string | number;
};

defineProps<Props>();
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="34" viewBox="0 0 22 34" fill="none">
        <text
            v-if="text"
            x="11"
            y="27"
            text-anchor="middle"
            fill="currentColor"
            class="text-xs font-semibold"
        >
            {{ text }}
        </text>
        <path
            d="M7.16421 9.40941H3.46192C2.35735 9.40941 1.46191 10.3048 1.46191 11.4094V29.2659C1.46191 30.3704 2.35734 31.2659 3.46191 31.2659H5.16421M7.16421 9.40941H14.7535M7.16421 9.40941V2.52645M14.7535 9.40941V2.52645M14.7535 9.40941H18.632C19.7366 9.40941 20.632 10.3048 20.632 11.4094V29.2659C20.632 30.3704 19.7366 31.2659 18.632 31.2659H16.7535M5.16421 31.2659V32.959M5.16421 31.2659H16.7535M16.7535 31.2659V32.959M7.16421 2.52645V1.95898C7.16421 1.4067 7.61192 0.958984 8.16421 0.958984H10.9588H13.7535C14.3058 0.958984 14.7535 1.4067 14.7535 1.95898V2.52645M7.16421 2.52645H14.7535"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</template>
