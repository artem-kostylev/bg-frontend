import { http } from "@/app/lib";
import type { Meta } from "@/app/types";
import type { Attraction } from "@/attractions/types";

export type FetchAttractionResponse = {
    meta: Meta;
    entity: Attraction;
};

const paths = {
    "attractions-id": "attraction/detail",
    "locations-id": "location/detail",
    "activities-id": "activity/detail",
};

export const fetchAttraction = async (id: string, name: keyof typeof paths) => {
    // TODO: Возвращать из бэка location в таком же формате как и в списках туров, отелей и тд
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await http<any>(`${paths[name]}/${id}`);

    // // TODO: Возвращать общий ключ для всех сущностей
    response.entity = response.location || response.attraction || response.activity;

    // TODO: FIX THIS
    const locationId = response.entity.location_id || response.entity.parent_id;
    const locationName = response.entity.location || response.entity.parent;

    response.entity.location = [{ id: locationId, name: locationName }];

    return response as FetchAttractionResponse;
};
