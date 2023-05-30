import { http } from '@/app/lib';
import type { Room } from '@/tours/types';

type FetchRoomResponse = Room;

export const fetchRoom = (id: number) => {
    return http<FetchRoomResponse>(`/room/${id}`);
};
