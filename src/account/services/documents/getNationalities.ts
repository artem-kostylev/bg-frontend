import { http } from '@/app/lib';
import type { Nationality } from '@/account/types';

export const getNationalities = async () => {
    const response = await http('nationalities');
    return response.data.map((item: { id: number; name: string }) => ({
        nationality_id: item.id,
        nationality_name: item.name,
    })) as Nationality[];
};
