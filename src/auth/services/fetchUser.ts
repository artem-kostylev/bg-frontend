import { http } from '@/app/lib';
import type { User } from '@/auth/types';

export type fetchUserResponse = {
    data: User;
};

export const fetchUser = async () => {
    const response = await http<fetchUserResponse>('profile');
    return response.data;
};
