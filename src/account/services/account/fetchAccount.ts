import { http } from '@/app/lib';
import type { Account } from '@/account/types';

type FetchAccountResponse = {
    data: Account;
};

export const fetchAccount = async () => {
    const { data } = await http<FetchAccountResponse>('user/get');
    return data;
};
