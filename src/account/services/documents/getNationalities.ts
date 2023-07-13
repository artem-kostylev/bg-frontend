import { http } from '@/app/lib';
import type { Nationality } from '@/account/types';

export type getNationalitiesResponse = {
    data: {
        created_at: string | null;
        deleted_at: string | null;
        id: number;
        location_id: string;
        name: string;
        updated_at: string | null;
    }[];
};

export const getNationalities = async () => {
    const response = await http<getNationalitiesResponse>('nationalities');
    return response.data.map((item: { id: number; name: string }) => ({
        nationality_id: item.id,
        nationality_name: item.name,
    })) as Nationality[];
};
