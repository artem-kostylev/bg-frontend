import { http } from '@/app/lib';

export type fetchRecommendedRegionsResponse = {
    label: string;
    children: {
        count: number;
        id: number;
        image: {
            url: string;
        };
        title: string;
    }[];
};

export const fetchRecommendedRegions = async (id: string | number) => {
    return await http(`location/${id}/populars`);
};
