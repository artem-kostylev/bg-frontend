import { http } from '@/app/lib';
import type { LoginInfo } from '@/auth/types';

export type FetchForgotSendBody = {
    email: string;
};

export const fetchForgotSend = async (loginInfo: LoginInfo) => {
    if (!loginInfo.loginValue || !loginInfo.loginType) return;

    const body: FetchForgotSendBody = {
        email: loginInfo.loginValue,
    };

    return http('user/password/forgot', {
        method: 'PUT',
        body,
    });
};
