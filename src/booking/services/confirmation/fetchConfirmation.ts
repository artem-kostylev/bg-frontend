import { http } from '@/app/lib';
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
    ids: string[] | string;
    tours_hash: string;
    transfers: string[];
    tickets: string[];
};

type FetchConfirmationPayload = FetchConfirmationQuery;

export const fetchConfirmation = async (payload: FetchConfirmationPayload) => {
    const tickets = payload.tickets ? parseTickets(payload.tickets) : undefined;

    const response = await http<FetchConfirmationResponse>('tour/confirmation', {
        method: 'POST',
        body: {
            ids: payload.ids[0],
            tours_hash: payload.tours_hash,
            transfers: payload.transfers,
            tickets,
        },
    });

    return response;
};
