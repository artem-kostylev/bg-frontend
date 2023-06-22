<script setup lang="ts">
import { Input, Button } from '@ui/components';
</script>

<template>
    <div class="max-w-[400px]">
        <div class="text-xl lg:text-2xl">Промокод</div>
        <div class="flex space-x-2.5 mt-6">
            <Input placeholder="Промокод" />
            <Button variant="primary">Применить</Button>
        </div>
    </div>
</template>
