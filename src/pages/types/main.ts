import type { Image, Filters } from '@/app/types';

export type SectionChild = {
    name: string;
    images: Image[];
    description: string;
    direct_link: string;
    link: {
        id: number;
        name: string;
        filters: Filters;
    };
    size?: 1 | 2 | 3;
    children?: {
        name: string;
        direct_link?: string;
        link: {
            id: number;
            name: string;
            filters: Filters;
        };
    }[];
};

export type Section = {
    name: string;
    type: 'standart_block_1' | 'standart_block_3' | 'location_5';
    children: SectionChild[];
};
