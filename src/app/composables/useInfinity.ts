import { ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

export const useInfinity = (cb: () => Promise<void>) => {
    const targetRef = ref<HTMLElement | null>(null);
    const loadingMore = ref(false);

    useIntersectionObserver(targetRef, async ([{ isIntersecting }]) => {
        if (isIntersecting) {
            loadingMore.value = true;
            await cb();
            loadingMore.value = false;
        }
    });

    return { targetRef, loadingMore };
};
