<script setup lang="ts">
import { Container, Avatar } from '@ui/components';
import { UserIcon, HeartIcon } from '@ui/icons';
import { AuthModal } from '@/auth/components';
import { useAuthStore } from '@/auth/stores/auth';
import { storeToRefs } from 'pinia';

const { isAuthenticated, user, showAuthModal } = storeToRefs(useAuthStore());
</script>

<template>
    <header class="border-b border-secondary-200 bg-white sticky md:static top-0 z-30">
        <Container class="flex items-center justify-between py-3.5">
            <NuxtLink :to="{ name: 'index' }">
                <img
                    src="@/app/assets/images/logo.svg"
                    loading="lazy"
                    alt="Библио глобус"
                    width="185"
                    height="33"
                />
            </NuxtLink>
            <div class="flex items-center space-x-4 text-secondary-500">
                <button
                    class="text-secondary-500 hover:text-secondary-600 transition-colors duration-300"
                    aria-label="Мои избранные"
                >
                    <HeartIcon width="1.6em" height="1.6em" />
                </button>
                <Avatar
                    v-if="isAuthenticated && user"
                    width="2em"
                    height="2em"
                    :initials="user.first_name + ' ' + user.last_name"
                    class="cursor-pointer"
                />
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
        <AuthModal v-model="showAuthModal" />
    </header>
</template>
