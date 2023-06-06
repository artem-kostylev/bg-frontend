import { markRaw } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Input } from '@ui/components';
import { UsersIcon } from '@ui/icons';

const meta: Meta<typeof Input> = {
    title: 'Ui/Input',
    component: Input,
    args: {
        placeholder: 'Search by text',
    },
    argTypes: {
        type: { control: 'select', options: ['Input', 'reset', 'submit'], defaultValue: 'md' },
        variant: {
            control: 'select',
            options: ['base', 'primary', 'secondary'],
            defaultValue: 'base',
        },
        size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'], defaultValue: 'md' },
        justify: { control: 'select', options: ['left', 'right', 'center', 'between'] },
        block: { control: 'boolean', defaultValue: false },
        loading: { control: 'boolean', defaultValue: false },
        disabled: { control: 'boolean', defaultValue: false },
        endIcon: { control: false },
        startIcon: { control: false },
    },
};

export default meta;

export const Base: StoryObj<typeof Input> = {};

export const Loading: StoryObj<typeof Input> = {
    args: {
        loading: true,
    },
};

export const Disabled: StoryObj<typeof Input> = {
    args: {
        disabled: true,
    },
};

export const StartIcon: StoryObj<typeof Input> = {
    args: {
        startIcon: markRaw(UsersIcon),
    },
};

export const EndIcon: StoryObj<typeof Input> = {
    args: {
        endIcon: markRaw(UsersIcon),
    },
};

export const Label: StoryObj<typeof Input> = {
    args: {
        label: 'Email',
        required: true,
    },
};

export const Hint: StoryObj<typeof Input> = {
    args: {
        ...Label.args,
        hint: 'Подсказка для ввода email',
    },
};

export const Error: StoryObj<typeof Input> = {
    args: {
        ...Hint.args,
        error: 'Поле обязательно для заполнения',
    },
};

export const Success: StoryObj<typeof Input> = {
    args: {
        ...Hint.args,
        success: 'Email успешно сохранен',
    },
};
