import { defineNuxtPlugin } from '#imports';
import { fetchUser } from '@/auth/services';
import { useAuthStore } from '@/auth/stores/auth';

export default defineNuxtPlugin(async () => {
    const authStore = useAuthStore();
    const { accessToken, user, setUser } = authStore;

    if (accessToken && !user) {
        const response = await fetchUser();
        response && setUser(response);
    }
});
