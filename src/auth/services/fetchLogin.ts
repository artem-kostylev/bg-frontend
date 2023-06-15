import { http } from '@/app/lib';
import type { LoginInfo, User } from '@/auth/types';

export type FetchLoginBody = {
    email: string;
    password: string;
};

export type FetchLoginResponse = {
    user: User;
    token: string;
};

export const fetchLogin = async (password: string, loginInfo: LoginInfo) => {
    if (!loginInfo.loginValue || !loginInfo.loginType) return;

    const body: FetchLoginBody = {
        email: loginInfo.loginValue,
        password,
    };

    return http<FetchLoginResponse>('user/login', {
        method: 'POST',
        body,
    });
};
