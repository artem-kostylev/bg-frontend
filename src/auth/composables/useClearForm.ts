import type { Ref } from 'vue';

export const useClearForm = (form: Ref<{ [key: string]: string }>) => {
    Object.keys(form.value).forEach(key => {
        form.value[key as keyof typeof form.value] = '';
    });
};
