import type { Meta, StoryObj } from '@storybook/vue3';
import { Select } from '@ui/components';
import { ref } from 'vue';

const meta: Meta<typeof Select> = {
    title: 'Ui/Select',

    component: Select,

    args: {
        placeholder: 'Сортировать по',
        options: [
            { label: 'Сначала дешевле', value: 1 },
            { label: 'Сначала дороже', value: 2 },
            { label: 'Звезды по возрастанию', value: 3 },
            { label: 'Звезды по убыванию', value: 4 },
        ],
    },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Multipe: Story = {
    render: args => ({
        components: { Select },
        setup: () => {
            const selected = ref([1, 2]);

            return { args, selected };
        },
        template: '<Select v-model="selected" v-bind="args" multiple />',
    }),
};

export const Single: Story = {
    render: args => ({
        components: { Select },
        setup: () => {
            const selected = ref('');

            return { args, selected };
        },
        template: '<Select v-model="selected" v-bind="args" />',
    }),
};
