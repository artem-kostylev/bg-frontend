<script setup lang="ts">
import { computed } from 'vue';
import { Select } from '@ui/components';

type Props = {
    modelValue: string;
};

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const sortOptions = [
    { label: 'Сначала новые', value: 'created_at:desc' },
    { label: 'Сначала старые', value: 'created_at:asc' },
    { label: 'Сначала с высоким рейтингом', value: 'average_rating:desc' },
    { label: 'Сначала с низким рейтингом', value: 'average_rating:asc' },
];

const value = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
});
</script>

<template>
    <div>
        <Select v-model="value" :options="sortOptions" />
    </div>
</template>
