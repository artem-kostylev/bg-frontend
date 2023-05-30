import { http } from '@/app/lib';
import type { Movement, SegmentMovement } from '@/booking/types';

export type FetchVoyageResponse = Movement;

export const fetchVoyage = async (flight_hash: Movement['flight_hash']) => {
    const response = await http<FetchVoyageResponse>('voyage/detail', {
        method: 'POST',
        body: { flight_hash },
    });

    const firstSegment = response.segments[0] as SegmentMovement;
    const lastSegment = response.segments[response.segments.length - 1] as SegmentMovement;

    // TODO: возвращать с бэка
    response.transport_hub_departure = firstSegment.transport_hub_departure;
    response.transport_hub_arrival = lastSegment.transport_hub_arrival;

    return response;
};
