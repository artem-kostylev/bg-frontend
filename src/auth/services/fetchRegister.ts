import { http } from '@/app/lib';
import type { RegisterForm, LoginType } from '@/auth/types';

type fetchRegisterBody = RegisterForm & { main_contact: LoginType };

export const fetchRegister = async (body: fetchRegisterBody) => {
    await http('user/registration', {
        method: 'POST',
        body,
    });
};
