import type { Meta } from "@/app/types";
import { http } from "@/app/lib";
import type { Hotel } from "@/hotels/types";

export type FetchHotelResponse = {
    meta: Meta;
    hotel: Hotel;
};

export const fetchHotel = async (id: string): Promise<FetchHotelResponse> => {
    // TODO: Возвращать meta с бэка

    const response = await http<Hotel>(`hotels/${id}`);

    return { meta: { title: response.name, description: response.name }, hotel: response };
};
