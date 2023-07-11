<script setup lang="ts">
import { SmileFaceIcon, SadFaceIcon } from '@ui/icons';
</script>

<template>
    <div class="flex justify-between items-center flex-wrap">
        <div>
            Оцените отель
            <span class="text-danger-600">*</span>
        </div>
        <div class="flex space-x-2 mt-4 sm:mt-0">
            <SadFaceIcon class="text-danger-600" /> <span> — плохо, </span>
            <SmileFaceIcon class="text-success-600" />
            <span>— превосходно</span>
        </div>
    </div>
</template>
