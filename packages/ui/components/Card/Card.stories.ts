import { h } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Card, Image, Typography } from '@ui/components';

const imageUrl = 'https://static.stage.bgit.ru/stage1/image/634d29eaa36db.jpg';

const meta: Meta<typeof Card> = {
    title: 'Ui/Card',

    component: Card,

    args: {
        default: 'Body',
        style: 'width: 400px',
    },

    argTypes: {
        initials: { control: 'text' },
        src: { control: 'text' },
    },
};

export default meta;

export const Default: StoryObj<typeof Card> = {};

export const WithHeader: StoryObj<typeof Card> = {
    args: {
        header: () => h(Typography, { variant: 'h3' }, () => 'Venera Hotel'),
    },
};

export const WithFooter: StoryObj<typeof Card> = {
    args: {
        footer: 'Footer',
    },
};

export const WithHeaderAndFooter: StoryObj<typeof Card> = {
    args: {
        header: 'Header',
        footer: 'Footer',
    },
};

export const WithCover: StoryObj<typeof Card> = {
    args: {
        cover: () => h(Image, { src: imageUrl }),
        coverClass: 'h-[14rem] bg-slate-100',
        header: 'Header',
        footer: 'Footer',
    },
};
