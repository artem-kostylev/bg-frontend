<script setup lang="ts">
import { Header, Footer } from '@/app/components';
</script>

<template>
    <div>
        <VitePwaManifest />
        <div class="min-h-screen flex flex-col">
            <Header />
            <NuxtLayout>
                <NuxtPage />
            </NuxtLayout>
        </div>
        <Footer />
    </div>
</template>
