<script setup lang="ts">
import { Header, Footer } from "@/app/components";
</script>

<template>
    <div>
        <div class="min-h-screen grid grid-rows-[auto_1fr_auto] grid-cols-[100%]">
            <Header />
            <slot />
            <Footer />
        </div>
    </div>
</template>
