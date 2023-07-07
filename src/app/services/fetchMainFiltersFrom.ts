import { http } from '@/app/lib';

export type FetchMainFiltersFromResponse = {
    id: number;
    name: string;
    type: string;
}[];

export const fetchMainFiltersFrom = async () => {
    const response = await http<FetchMainFiltersFromResponse>(`location/from`, {
        method: 'POST',
    });

    return response;
};
