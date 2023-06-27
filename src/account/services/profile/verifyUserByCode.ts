import { http } from '@/app/lib';

type VerifyByCodePayload = Record<string, string>;

export const verifyUserByCode = async (payload: VerifyByCodePayload) => {
    return await http('user/verify-user-by-code', {
        method: 'POST',
        body: payload,
    });
};
