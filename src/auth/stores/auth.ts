import { ref, computed } from 'vue';
import { useCookie, useRuntimeConfig } from '#imports';
import { defineStore } from 'pinia';
import type { User } from '@/auth/types';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const isAuthenticated = computed(() => !!user.value);

    const setUser = (value: User | null) => {
        user.value = value;
    };

    const rc = useRuntimeConfig();
    const domain = rc.public.hostname ? `.${rc.public.hostname}` : 'localhost';

    const accessToken = useCookie('Access-token', { domain });

    const setAccessToken = (value: string | null) => {
        useCookie('Access-token', { domain }).value = value;
        accessToken.value = value;
    };

    return { accessToken, user, isAuthenticated, setUser, setAccessToken };
});
