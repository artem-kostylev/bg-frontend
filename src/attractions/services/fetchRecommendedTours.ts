import { http } from '@/app/lib';
export const fetchRecommendedTours = async (id: string | number) => {
    const response = await http(`location/${id}/tours`);

    response.children.forEach((item: any) => {
        item.image = item.image[0];
    });

    return response;
};
