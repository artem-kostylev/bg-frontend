import type { Meta } from "@/app/types";
import { http } from "@/app/lib";
import type { Hotel } from "@/hotels/types";
import { showError } from "#imports";

export type FetchHotelResponse = {
    meta: Meta;
    hotel: Hotel;
};

export const fetchHotel = async (id: number | string): Promise<FetchHotelResponse> => {
    const response = await http<Hotel>(`hotels/${id}`, {
        onResponseError: ({ response }) => {
            showError({ statusCode: response.status });
        },
    });

    // TODO: Возвращать meta с бэка

    return { meta: { title: response.name, description: response.name }, hotel: response };
};
