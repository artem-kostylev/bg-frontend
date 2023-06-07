import { http } from '@/app/lib';
import type { Section } from '@/pages/types';

export const fetchSections = async (name: string) => {
    const path = name === 'index' ? 'tours' : name;

    // TODO: Вытащить секции из extra и возвращать их на бэке
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await http<any>(`page-structure/list/${path}`, {
        query: { location_id: 260 },
    });

    // TODO: Исправить на бэке
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response[0].extra.forEach((item: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        item.children.forEach((child: any) => {
            if ('hotel_name' in child) {
                child.name = child.hotel_name;
                delete child.hotel_name;
            }

            if ('location_name' in child) {
                child.description = child.location_name;
                delete child.location_name;
            }
        });
    });

    return {
        sections: response[0].extra as Section[],
        meta: { title: name, description: name },
    };
};
