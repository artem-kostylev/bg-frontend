import { inject } from 'vue';

type Options = {
    duration: number;
};

type Context = {
    success: (text: string, options?: Options) => void;
    danger: (text: string, options?: Options) => void;
};

export const useMessage = () => {
    const context = inject<Context | null>('messages', null);

    if (!context) throw new Error('MessageProvider is required');

    return context;
};
