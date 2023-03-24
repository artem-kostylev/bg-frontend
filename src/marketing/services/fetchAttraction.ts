import { http } from "@/app/lib";
import type { Meta } from "@/app/types";
import type { Attraction } from "@/marketing/types";

export type FetchAttractionResponse = {
    meta: Meta;
    attraction: Attraction;
};

export const fetchAttraction = async (id: string) => {
    // TODO: Возвращать из бэка location в таком же формате как и в списках туров, отелей и тд
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await http<any>(`attraction/detail/${id}`);

    response.attraction.location = [
        { id: response.attraction.location_id, name: response.attraction.location },
    ];

    return response as FetchAttractionResponse;
};
