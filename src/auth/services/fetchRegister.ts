import { http } from '@/app/lib';
import type { RegisterForm, LoginType } from '@/auth/types';

export type FetchRegisterBody = RegisterForm & { main_contact: LoginType };

export const fetchRegister = async (body: FetchRegisterBody) => {
    await http('user/registration', {
        method: 'POST',
        body,
    });
};
