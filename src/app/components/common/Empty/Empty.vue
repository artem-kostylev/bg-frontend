<script setup lang="ts">
import { Typography } from '@ui/components';

type Props = {
    title?: string;
    description?: string;
};

withDefaults(defineProps<Props>(), {
    title: 'По вашему запросу ничего не нашлось',
    description:
        'Попробуйте скорректировать поиск, изменив регион, даты заезда и выезда, количество гостей или фильтры',
});
</script>

<template>
    <div class="flex flex-col items-center justify-center">
        <div class="max-w-[550px] mx-auto space-y-2.5 text-center">
            <Typography v-if="title" variant="h3">{{ title }}</Typography>
            <Typography variant="description">{{ description }}</Typography>
            <slot name="actions" />
        </div>
    </div>
</template>
