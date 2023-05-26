import type { Component } from 'vue';

export type PaperProps = {
    as?: string | Component;
};

export const paperDefaultProps = {
    as: 'div',
};
