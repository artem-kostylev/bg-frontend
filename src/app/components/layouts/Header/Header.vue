<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { Container } from '@ui/components';
import { UserIcon } from '@ui/icons';
import { useAuthStore } from '@/auth/stores';
import { AuthMenu } from '@/auth/components';

const AuthModal = defineAsyncComponent(() =>
    import('@/auth/components').then(meta => meta.AuthModal)
);

const { isAuthenticated, showAuthModal } = storeToRefs(useAuthStore());
</script>

<template>
    <header class="border-b border-secondary-200 bg-white">
        <Container class="flex items-center justify-between py-3.5">
            <NuxtLink :to="{ name: 'index' }">
                <img
                    src="@/app/assets/images/logo.svg"
                    loading="lazy"
                    alt="Библио глобус"
                    width="190"
                    height="29"
                />
            </NuxtLink>
            <div class="flex items-center space-x-4 text-secondary-500">
                <AuthMenu v-if="isAuthenticated" />
                <button
                    v-else
                    class="text-secondary-500 hover:text-secondary-600 transition-colors duration-300"
                    aria-label="Авторизация"
                    @click="showAuthModal = true"
                >
                    <UserIcon width="1.6em" height="1.6em" />
                </button>
            </div>
        </Container>
        <AuthModal v-if="!isAuthenticated" v-model="showAuthModal" />
    </header>
</template>
