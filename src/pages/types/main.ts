import type { Image } from '@/app/types';

export type SectionChild = {
    name: string;
    images: Image[];
    description: string;
    direct_link: string;
};

export type Section = {
    name: string;
    type: 'standart_block_1' | 'standart_block_3' | 'location_5';
    children: SectionChild[];
};
