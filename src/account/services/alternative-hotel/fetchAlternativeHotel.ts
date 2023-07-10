// import { http } from '@/app/lib';
import type { AlternativeHotelInfo } from '@/account/types';

type FetchAlternativeHotelPayload = {
    order_id: number;
    order_accommodation_id: string[];
    tour_id: number[];
};

export type FetchAlternativeHotelResponse = {
    date_start: string;
    date_finish: string;
    duration: number;
    accommodations: AlternativeHotelInfo[];
};

export const fetchAlternativeHotel = async (payload: FetchAlternativeHotelPayload) => {
    // return http<FetchAlternativeHotelResponse>('order/alternative_accommodation', {
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
                total_price: 100000,
                rooms: [
                    {
                        id: 79,
                        name: 'STANDARD RO',
                        tour_id: 1234,
                        group_id: 1,
                        tourists: ['Феофилактов-Задонский Ф.М.', 'Феофилактова-Задонская З.К.'],
                        board: 'ВВ (Только завтрак)',
                        images: [
                            {
                                url: 'https://static.stage.bgit.ru/stage3/image/6406ffe6d70cc.',
                            },
                        ],
                        size: 36,
                        views: [
                            {
                                key: 'city',
                                label: 'город',
                            },
                        ],
                        beds: [
                            {
                                key: 'double_bed',
                                label: 'Двуспальная кровать',
                                qty: 2,
                            },
                        ],
                        max_number_of_tourists: 4,
                        facilities: [
                            {
                                key: 'air_conditioning',
                                label: 'Кондиционер',
                            },
                            {
                                key: 'free_wifi',
                                label: 'Wi-Fi',
                            },
                        ],
                        room_location: [],
                    },
                    {
                        id: 78,
                        name: 'STANDARD',
                        tour_id: 1234,
                        group_id: 1,
                        tourists: ['Феофилактов-Задонский Ф.М.', 'Феофилактова-Задонская З.К.'],
                        board: 'ВВ (Только завтрак)',
                        images: [
                            {
                                url: 'https://static.stage.bgit.ru/stage3/image/6406ffe5e528c.',
                            },
                        ],
                        size: 34,
                        views: [
                            {
                                key: 'city',
                                label: 'город',
                            },
                        ],
                        beds: [
                            {
                                key: 'queen_bed',
                                label: 'Большая двуспальная кровать (queen_bed)',
                                qty: 2,
                            },
                        ],
                        max_number_of_tourists: 4,
                        facilities: [
                            {
                                key: 'air_conditioning',
                                label: 'Кондиционер',
                            },
                            {
                                key: 'free_wifi',
                                label: 'Wi-Fi',
                            },
                        ],
                        room_location: [],
                    },
                ],
            },
        ],
    } as FetchAlternativeHotelResponse;
};
