import { http } from '@/app/lib';

export const fetchLogout = async () => {
    return http('user/logout', {
        method: 'DELETE',
    });
};
