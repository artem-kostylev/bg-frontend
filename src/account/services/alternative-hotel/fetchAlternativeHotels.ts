// import { http } from '@/app/lib';
import type { AlternativeHotel } from '@/account/types';

type FetchAlternativeHotelsPayload = {
    order_id: number;
    order_accommodation_id: string[];
    page: number;
};

export type FetchAlternativeHotelsResponse = {
    date_start: string;
    date_finish: string;
    duration: number;
    accommodations: AlternativeHotel[];
    has_next: boolean;
};

export const fetchAlternativeHotels = async (payload: FetchAlternativeHotelsPayload) => {
    // return http<FetchAlternativeHotelsResponse>('order/alternative_accommodations', {
    //     method: 'POST',
    //     body: payload,
    // });

    console.log('payload', payload);

    return {
        date_start: '2023-08-01',
        date_finish: '2023-08-08',
        duration: 7,
        accommodations: [
            {
                id: 6448,
                stars: 3,
                name: 'Santa Sophia Hotel',
                address: null,
                images: [
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/634d7201554e3.jpeg',
                    },
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/6405f56366e6a.',
                    },
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/6405f5636b59d.',
                    },
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/6405f56404bd5.',
                    },
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/6405f56404856.',
                    },
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/6405f5643b433.',
                    },
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/6405f56492592.',
                    },
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/6405f564c3e89.',
                    },
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/6405f56587dc0.',
                    },
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/6405f57b82a15.',
                    },
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/6405f57bee6a3.',
                    },
                ],
                location: [
                    {
                        id: 208,
                        name: 'Турция',
                    },
                    {
                        id: 15057,
                        name: 'Стамбул',
                    },
                    {
                        id: 15045,
                        name: 'Стамбул (Старый город-Султанахмет)',
                    },
                ],
                food: [
                    {
                        id: 1,
                        name: 'BB',
                        description: 'Завтраки',
                    },
                ],
                airport_remoteness: 53000,
                beach_remoteness: null,
                rating: '0.0',
                reviews: 0,
                total_price: 100000,
                rooms: [
                    {
                        id: 1234,
                        tour_id: 1234,
                        group_id: 1,
                        tourists: ['Феофилактов-Задонский Ф.М.', 'Феофилактова-Задонская З.К.'],
                        name: 'Standard room with beach front view',
                        board: 'ВВ (Только завтрак)',
                    },
                    {
                        id: 1234,
                        tour_id: 1234,
                        group_id: 1,
                        tourists: ['Феофилактов-Задонский Ф.М.', 'Феофилактова-Задонская З.К.'],
                        name: 'Standard room with beach front view',
                        board: 'ВВ (Только завтрак)',
                    },
                ],
            },
            {
                id: 6448,
                stars: 3,
                name: 'Santa Sophia Hotel',
                address: null,
                images: [
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/634d7201554e3.jpeg',
                    },
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/6405f56366e6a.',
                    },
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/6405f5636b59d.',
                    },
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/6405f56404bd5.',
                    },
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/6405f56404856.',
                    },
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/6405f5643b433.',
                    },
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/6405f56492592.',
                    },
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/6405f564c3e89.',
                    },
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/6405f56587dc0.',
                    },
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/6405f57b82a15.',
                    },
                    {
                        url: 'https://static.stage.bgit.ru/stage3/image/6405f57bee6a3.',
                    },
                ],
                location: [
                    {
                        id: 208,
                        name: 'Турция',
                    },
                    {
                        id: 15057,
                        name: 'Стамбул',
                    },
                    {
                        id: 15045,
                        name: 'Стамбул (Старый город-Султанахмет)',
                    },
                ],
                food: [
                    {
                        id: 1,
                        name: 'BB',
                        description: 'Завтраки',
                    },
                ],
                airport_remoteness: 53000,
                beach_remoteness: null,
                rating: '0.0',
                reviews: 0,
                total_price: 100000,
                rooms: [
                    {
                        id: 1234,
                        tour_id: 1234,
                        group_id: 1,
                        tourists: ['Феофилактов-Задонский Ф.М.', 'Феофилактова-Задонская З.К.'],
                        name: 'Standard room with beach front view',
                        board: 'ВВ (Только завтрак)',
                    },
                    {
                        id: 1234,
                        tour_id: 1234,
                        group_id: 1,
                        tourists: ['Феофилактов-Задонский Ф.М.', 'Феофилактова-Задонская З.К.'],
                        name: 'Standard room with beach front view',
                        board: 'ВВ (Только завтрак)',
                    },
                ],
            },
        ] as AlternativeHotel[],
        has_next: false,
    } as FetchAlternativeHotelsResponse;
};
