import { http } from '@/app/lib';
import type { LoginInfo, User } from '@/auth/types';

type FetchVerifyCheckBody = {
    phone?: string;
    email?: string;
    code: string;
};

export type FetchVerifyCheckResponse = {
    user: User;
    token: string;
};

export const fetchVerifyCheck = async (code: string, loginInfo: LoginInfo) => {
    if (!loginInfo.loginValue || !loginInfo.loginType) return;

    const body: FetchVerifyCheckBody = { code };
    body[loginInfo.loginType] = loginInfo.loginValue;

    return http<FetchVerifyCheckResponse>('user/verify-user-by-code', {
        method: 'POST',
        body,
    });
};
