import { http } from '@/app/lib';
import type { Insurance, Questionnary } from '@/booking/types';

export type FetchInsurancesPayload = {
    questionnary: Questionnary;
    insurances: Insurance[];
};

export type FetchInsurancesResponse = {
    data: {
        id: number;
        name: string;
        price: number;
        description: {
            sum: string | number;
            currency: string;
        };
    }[];
};

export const fetchInsurances = async (payload: FetchInsurancesPayload) => {
    const response = await http<FetchInsurancesResponse>('tour/list_insurance', {
        body: {
            id: payload.questionnary.tour_id,
            date_of_birth: payload.questionnary.form.birthday,
            nationality_id: payload.questionnary.form.nationality_id,
        },
        method: 'post',
    });

    return [payload.insurances[0], ...response.data];
};
