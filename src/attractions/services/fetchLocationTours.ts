import { http } from '@/app/lib';
import type { LocationTours } from '@/attractions/types';

export type FetchLocationToursResponse = {
    children: LocationTours[];
};

export const fetchLocationTours = async (id: number) => {
    return http<FetchLocationToursResponse>(`location/${id}/tours`);
};
