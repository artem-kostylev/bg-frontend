import { http } from '@/app/lib';
import { showError } from '#imports';
import type { Meta } from '@/app/types';
import type { Hotel } from '@/tours/types';

export type FetchHotelResponse = {
    meta: Meta;
    hotel: Hotel;
};

export const fetchHotel = async (id: string | number): Promise<FetchHotelResponse> => {
    const response = await http<Hotel>(`hotels/${id}`, {
        onResponseError: ({ response }) => {
            showError({ statusCode: response.status });
        },
    });

    return { meta: { title: response.name, description: response.name }, hotel: response };
};
