import { http } from '@/app/lib';
import type { LoginInfo } from '@/auth/types';

export type FetchVerifySendBody = {
    phone?: string;
    email?: string;
};

export const fetchVerifySend = async (loginInfo: LoginInfo) => {
    if (!loginInfo.loginValue || !loginInfo.loginType) return;

    const body: FetchVerifySendBody = {};
    body[loginInfo.loginType] = loginInfo.loginValue;

    return http('user/verify-code-send', {
        method: 'POST',
        body,
    });
};
