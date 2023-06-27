import { http } from '@/app/lib';

type ConfirmationPayload = Record<string, string>;

export const confirmationPhoneOrEmail = async (payload: ConfirmationPayload) => {
    return await http('user/verify-code-send', {
        method: 'POST',
        body: payload,
    });
};
