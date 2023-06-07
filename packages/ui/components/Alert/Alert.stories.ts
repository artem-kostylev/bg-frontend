import { markRaw } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Alert } from '@ui/components';
import { SearchIcon } from '@ui/icons';

const meta: Meta<typeof Alert> = {
    title: 'Ui/Alert',
    component: Alert,
    args: {
        default: 'Alert',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['base', 'info', 'success', 'warning', 'error'],
            defaultValue: 'base',
        },
        text: {
            control: 'text',
        },
        title: {
            control: 'text',
        },
        startIcon: { control: false },
    },
};

export default meta;

export const Base: StoryObj<typeof Alert> = {
    args: {
        variant: 'base',
        title: 'По вашему запросу туры не найдены',
        text: 'Измените поисковый запрос или рассмотрите похожие варианты',
    },
};

export const Info: StoryObj<typeof Alert> = {
    args: {
        variant: 'info',
        title: 'По вашему запросу туры не найдены',
        text: 'Измените поисковый запрос или рассмотрите похожие варианты',
    },
};

export const Success: StoryObj<typeof Alert> = {
    args: {
        variant: 'success',
        title: 'По вашему запросу туры не найдены',
        text: 'Измените поисковый запрос или рассмотрите похожие варианты',
    },
};

export const Warning: StoryObj<typeof Alert> = {
    args: {
        variant: 'warning',
        title: 'По вашему запросу туры не найдены',
        text: 'Измените поисковый запрос или рассмотрите похожие варианты',
    },
};

export const Error: StoryObj<typeof Alert> = {
    args: {
        variant: 'error',
        title: 'По вашему запросу туры не найдены',
        text: 'Измените поисковый запрос или рассмотрите похожие варианты',
    },
};

export const StartIcon: StoryObj<typeof Alert> = {
    args: {
        startIcon: markRaw(SearchIcon),
        title: 'По вашему запросу туры не найдены',
        text: 'Измените поисковый запрос или рассмотрите похожие варианты',
    },
};
