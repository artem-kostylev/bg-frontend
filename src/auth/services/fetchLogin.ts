import { http } from '@/app/lib';
import type { LoginInfo, User } from '@/auth/types';

type fetchLoginBody = {
    email: string;
    password: string;
};

export type fetchLoginResponse = {
    user: User;
    token: string;
};

export const fetchLogin = async (password: string, loginInfo: LoginInfo) => {
    if (!loginInfo.loginValue || !loginInfo.loginType) return;

    const body: fetchLoginBody = {
        email: loginInfo.loginValue,
        password,
    };

    return http<fetchLoginResponse>('user/login', {
        method: 'POST',
        body,
    });
};
