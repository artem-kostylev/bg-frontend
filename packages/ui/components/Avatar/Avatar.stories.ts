import type { Meta, StoryObj } from '@storybook/vue3';
import { Avatar } from '@ui/components';

const meta: Meta<typeof Avatar> = {
    title: 'Ui/Avatar',
    component: Avatar,
    args: {
        width: '52px',
        height: '52px',
    },
    argTypes: {
        initials: { control: 'text' },
        src: { control: 'text' },
    },
};

export default meta;

export const Initials: StoryObj<typeof Avatar> = {
    args: {
        initials: 'Pitter Purker',
    },
};

export const Source: StoryObj<typeof Avatar> = {
    args: {
        src: 'https://avatars.githubusercontent.com/u/23360933?s=200',
    },
};
