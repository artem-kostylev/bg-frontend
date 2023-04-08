<script setup lang="ts">
import { Header, Footer } from "@/app/components";
</script>

<template>
    <div>
        <div class="min-h-screen flex flex-col">
            <Header />
            <main class="flex-1 flex flex-col">
                <slot />
            </main>
        </div>
        <Footer />
    </div>
</template>
