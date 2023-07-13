import { http } from '@/app/lib';
import type { ShortAttraction } from '@/attractions/types';

export type FetchShortAttractionResponse = ShortAttraction[];

type AttractionPath = 'populars' | 'attractions' | 'activities';

export const fetchShortAttraction = async (id: number, path: AttractionPath) => {
    // TODO: Привести к одинаковому формату сущности populars, attractions и activities
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await http<any>(`location/${id}/${path}`);

    return path === 'populars' ? response.children : response;
};
