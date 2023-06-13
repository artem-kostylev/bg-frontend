import { http } from '@/app/lib';
import type { ActivityDetail } from '@/booking/types';

export type FetchActivityResponse = {
    activity: ActivityDetail;
};

export const fetchActivity = async (id: number) => {
    return await http<FetchActivityResponse>(`activity/detail/${id}`, { method: 'POST' });
};
