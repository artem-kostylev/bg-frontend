<script setup lang="ts">
import { Header, Footer } from '@/app/components';
import { MessageProvider } from '@ui/components';
</script>

<template>
    <div>
        <MessageProvider />
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
