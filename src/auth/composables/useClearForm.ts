import type { Ref } from 'vue';

export const useClearForm = (form: Ref<{ [key: string]: string | number | null }>) => {
    Object.keys(form.value).forEach(key => {
        form.value[key as keyof typeof form.value] = '';
    });
};
