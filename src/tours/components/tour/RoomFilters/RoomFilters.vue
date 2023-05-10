<script setup lang="ts">
import { Button } from "@ui/components";
import { CalendarIcon, MoonIcon } from "@ui/icons";
</script>

<template>
    <div class="flex items-center space-x-2.5">
        <Button :end-icon="CalendarIcon">с 16.05 по 23.05</Button>
        <Button :end-icon="MoonIcon">от 6 до 13 ночей</Button>
    </div>
</template>
