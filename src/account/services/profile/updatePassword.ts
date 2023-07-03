import { http } from '@/app/lib';
import type { Profile } from '@/account/types';

type UpdatePasswordResponse = {
    data: Profile;
};

type UpdatePasswordPayload = {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
};

export const updatePassword = async (payload: UpdatePasswordPayload) => {
    const { data } = await http<UpdatePasswordResponse>('user/password/update-by-password', {
        method: 'PATCH',
        body: payload,
    });

    return data;
};
