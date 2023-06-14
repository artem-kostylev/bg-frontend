import { http } from '@/app/lib';
import type { User } from '@/auth/types';

export type FetchUserResponse = {
    data: User;
};

export const fetchUser = async () => {
    const response = await http<FetchUserResponse>('profile');
    return response.data;
};
