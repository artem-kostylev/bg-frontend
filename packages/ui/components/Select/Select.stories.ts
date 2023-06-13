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

export const Label: Story = {
    args: {
        label: 'Сортировка',
        modelValue: '',
        required: true,
    },
};

export const Hint: Story = {
    args: {
        ...Label.args,
        modelValue: '',
        hint: 'Описание',
    },
};

export const Error: Story = {
    args: {
        ...Label.args,
        modelValue: '',
        error: 'Поле обязательно для заполнения',
    },
};

export const Success: Story = {
    args: {
        ...Label.args,
        modelValue: '',
        success: 'Поле обязательно для заполнения',
    },
};

export const Block: Story = {
    args: {
        ...Label.args,
        modelValue: '',
        block: true,
    },
};
