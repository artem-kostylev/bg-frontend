<script setup lang="ts">
import { Header, Footer } from '@/app/components';
import { MessageProvider } from '@ui/components';
</script>

<template>
    <MessageProvider>
        <VitePwaManifest />
        <div class="min-h-screen flex flex-col">
            <Header />
            <NuxtLayout>
                <NuxtPage />
            </NuxtLayout>
        </div>
        <Footer />
    </MessageProvider>
</template>
