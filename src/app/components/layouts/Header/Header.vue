<script setup lang="ts">
import { Container, Image } from "@ui/components";
import { UserIcon, HeartIcon } from "@ui/icons";
</script>

<template>
    <header class="border-b border-slate-200 bg-white sticky md:static top-0 z-30">
        <Container class="flex items-center justify-between py-3.5">
            <NuxtLink :to="{ name: 'index' }">
                <Image src="/images/logo.svg" alt="Библио глобус" width="185" height="33" />
            </NuxtLink>
            <div class="flex items-center space-x-4 text-slate-500">
                <button
                    class="text-slate-500 hover:text-slate-600 transition-colors duration-300"
                    aria-label="Мои избранные"
                >
                    <HeartIcon width="1.6em" height="1.6em" />
                </button>
                <button
                    class="text-slate-500 hover:text-slate-600 transition-colors duration-300"
                    aria-label="Авторизация"
                >
                    <UserIcon width="1.6em" height="1.6em" />
                </button>
            </div>
        </Container>
    </header>
</template>
