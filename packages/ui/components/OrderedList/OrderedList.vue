<script setup lang="ts">
type Props = {
    data: string[];
};

defineProps<Props>();
</script>

<template>
    <div class="flex list-none">
        <div v-if="data.length > 1" class="flex flex-col mr-1.5">
            <div v-for="(item, i) in data" :key="i">
                <span>{{ i + 1 }}.</span>
            </div>
        </div>
        <div class="flex flex-col">
            <div v-for="item in data" :key="item">
                <span>{{ item }}</span>
            </div>
        </div>
    </div>
</template>
