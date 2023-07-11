import { http } from '@/app/lib';
import type { Profile } from '@/account/types';

type FetchProfileResponse = {
    data: Profile;
};

export const fetchProfile = async () => {
    const { data } = await http<FetchProfileResponse>('user/get');
    return data;
};
