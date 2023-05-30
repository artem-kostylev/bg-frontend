import { http, parseTo, parseTourists } from '@/app/lib';
import type { Movement } from '@/booking/types';
import type { Filters } from '@/app/types';

export type FetchMovementResponse = Movement;

export type FetchMovementQuery = {
    ids?: string[];
    tour_type?: string;
    package_tour_id?: string;
    accommodations_unikey: string[];
    tour_from: string;
    tour_begin_date?: string;
    tour_return_date?: string;
    tour_to?: string;
    tour_tourists?: string[];
};

export type FetchMovementPayload = FetchMovementQuery & { flight_hash: Movement['flight_hash'] };

type FetchMovementBody = Omit<FetchMovementPayload, 'tour_tourists' | 'tour_to'> &
    Pick<Filters, 'tour_tourists'> & { tour_to?: number | string };

export const fetchMovement = async (
    payload: FetchMovementPayload,
    name: 'booking-tickets' | 'avia-search'
) => {
    const body: FetchMovementBody = {
        ids: payload.ids,
        accommodations_unikey: payload.accommodations_unikey,
        tour_from: payload.tour_from,
        tour_type: name === 'avia-search' ? 'avia' : payload.tour_type,
        flight_hash: payload.flight_hash,
        package_tour_id: payload.package_tour_id,
    };

    if (name === 'avia-search') {
        body.tour_to = payload.tour_to && parseTo(payload.tour_to).id;
        body.tour_begin_date = payload.tour_begin_date?.[0];
        body.tour_return_date = payload.tour_begin_date?.[1];
        body.tour_tourists = payload.tour_tourists && parseTourists(payload.tour_tourists);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await http<any>('tour/movement', {
        method: 'POST',
        body,
    });

    // TODO: возвращать с бэка
    response.transport_hub_departure = response.segments[0].transport_hub_departure;
    response.transport_hub_arrival =
        response.segments[response.segments.length - 1].transport_hub_arrival;

    return response;
};
