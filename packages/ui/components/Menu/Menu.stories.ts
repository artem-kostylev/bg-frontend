import { ref } from 'vue';
import { Menu } from '@ui/components';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof Menu> = {
    title: 'Ui/Menu',

    component: Menu,

    args: {
        options: [
            { label: 'Персональная информация', value: 1 },
            { label: 'Документы туристов', value: 2 },
            { label: 'Мои поездки', value: 3 },
            { label: 'Мои отзывы', value: 4 },
            { label: 'Обратная связь', value: 5 },
            { label: 'Выход', value: 6 },
        ],
    },
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Single: Story = {
    render: args => ({
        components: { Menu },

        setup: () => {
            const selected = ref(null);

            return { args, selected };
        },
        template: '<Menu v-model="selected" v-bind="args" />',
    }),
};

export const Multiple: Story = {
    render: args => ({
        components: { Menu },

        setup: () => {
            const selected = ref([]);

            return { args, selected };
        },
        template: '<Menu v-model="selected" v-bind="args" multiple />',
    }),
};
