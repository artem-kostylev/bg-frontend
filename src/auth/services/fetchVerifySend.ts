import { http } from '@/app/lib';
import type { LoginInfo } from '@/auth/types';

type fetchVerifySendBody = {
    phone?: string;
    email?: string;
};

export const fetchVerifySend = async (loginInfo: LoginInfo) => {
    if (!loginInfo.loginValue || !loginInfo.loginType) return;

    const body: fetchVerifySendBody = {};
    body[loginInfo.loginType] = loginInfo.loginValue;

    return http('user/verify-code-send', {
        method: 'POST',
        body,
    });
};
