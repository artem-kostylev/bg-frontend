import { http } from '@/app/lib';
import type { Meta } from '@/app/types';
import type { ActivityInfo } from '@/booking/types';

export type FetchActivityResponse = {
    activity: ActivityInfo;
    meta: Meta;
};

export const fetchActivity = async (id: string) => {
    return await http<FetchActivityResponse>(`activity/detail/${id}`, {
        method: 'post',
    });
};
