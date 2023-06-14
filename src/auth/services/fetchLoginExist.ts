import { http } from '@/app/lib';
import type { LoginType } from '@/auth/types';

export type FetchLoginExistResponse = {
    isVerified: boolean;
    loginType: LoginType;
};

export const fetchLoginExist = async (login: string) => {
    return http<FetchLoginExistResponse>(`user/login-exist/${login}`);
};
