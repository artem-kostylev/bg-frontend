<script setup lang="ts">
import { Room } from "@/hotels/types";

type Props = {
    room: Room;
};

defineProps<Props>();
</script>

<template>
    <div>{{ room }}</div>
</template>
