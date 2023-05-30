import { abortNavigation, defineNuxtRouteMiddleware } from '#imports';
import { useAuthStore } from '@/auth/stores';
import { storeToRefs } from 'pinia';

export default defineNuxtRouteMiddleware(async () => {
    const { isAuthenticated } = storeToRefs(useAuthStore());

    if (!isAuthenticated.value) return abortNavigation();
});
