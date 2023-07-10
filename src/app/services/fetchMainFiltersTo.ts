import { http } from '@/app/lib';

export type FetchMainFiltersToResponse = {
    title: string;
    children?: { id: number; title: string; location?: string; type: string }[];
}[];

export const fetchMainFiltersTo = async (text: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await http<any>(`location/search?text=${text}`, {
        method: 'post',
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response.forEach((item: any) => {
        if (item.children) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            item.children.forEach((child: any) => {
                if (child.location) {
                    child.location = child.location.join(', ');
                }
            });
        }
    });

    return response as FetchMainFiltersToResponse;
};
