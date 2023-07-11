<script setup lang="ts">
import { Button } from '@ui/components';
import { DownloadArrowIcon } from '@ui/icons';

type Props = {
    href: string;
};

defineProps<Props>();
</script>

<template>
    <a :href="href" download target="_blank" class="block w-full">
        <Button variant="secondary" :start-icon="DownloadArrowIcon" class="w-full sm:w-max">
            Сохранить все документы
        </Button>
    </a>
</template>
