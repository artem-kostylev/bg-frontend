import { http } from '@/app/lib';

type VerifyPayload = Record<string, string>;

export const verifyPhoneOrEmail = async (payload: VerifyPayload) => {
    return await http('user/verify-code-send-when-login-updating', {
        method: 'POST',
        body: payload,
    });
};
