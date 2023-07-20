import { http, parseTourists } from '@/app/lib';
import { parseTickets } from '@/booking/lib';
import type {
    Accommodation,
    Movement,
    Insurance,
    Transfer,
    General,
    IncludedActivity,
    ExtraActivity,
} from '@/booking/types';

export type FetchConfirmationResponse = {
    general: General;
    accommodations: Accommodation[];
    movements: Movement[];
    insurances: Insurance[];
    transfers: Transfer[];
    included_activities: IncludedActivity[];
    extra_activities: ExtraActivity[];
};

export type FetchConfirmationQuery = {
    tour_ids: string[];
    tours_hash: string;
    transfers: string[];
    tickets: string[];
    tour_tourists?: string[];
};

type FetchConfirmationPayload = FetchConfirmationQuery;

export const fetchConfirmation = async (payload: FetchConfirmationPayload) => {
    const tickets = payload.tickets ? parseTickets(payload.tickets) : undefined;

    return await http<FetchConfirmationResponse>('tour/confirmation', {
        method: 'POST',
        body: {
            tour_ids: payload.tour_ids.flat(1),
            tours_hash: payload.tours_hash,
            transfers: payload.transfers,
            tour_tourists: payload.tour_tourists && parseTourists(payload.tour_tourists),
            tickets,
        },
    });
};
