import { http } from '@/app/lib';
import type { Profile } from '@/account/types';

type UpdateProfileResponse = {
    data: Profile;
};

type UpdateProfilePayload = Profile;

export const updateProfile = async (payload: UpdateProfilePayload) => {
    const { data } = await http<UpdateProfileResponse>('user/update', {
        method: 'PUT',
        body: payload,
    });

    return data;
};
