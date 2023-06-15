import { http } from '@/app/lib';

export type FetchForgotCheckBody = {
    code: string;
    password: string;
    password_confirmation: string;
    email: string;
};

export const fetchForgotCheck = async (body: FetchForgotCheckBody) => {
    return http('user/password/update-by-code', {
        method: 'PATCH',
        body,
    });
};
