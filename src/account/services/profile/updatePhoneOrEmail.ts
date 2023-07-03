import { http } from '@/app/lib';

type VerifyPayload = Record<string, string>;

export const updatePhoneOrEmail = async (payload: VerifyPayload) => {
    return await http('user/login-update', {
        method: 'PATCH',
        body: payload,
    });
};
