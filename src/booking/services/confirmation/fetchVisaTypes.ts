import { http } from '@/app/lib';

export type fetchVisaTypesPayload = {
    tour_id: string;
    form: { document_type_id?: number };
};

export type fetchVisaTypesResponse = {
    id: string | number;
    name: string;
    description: string;
    price: string | number;
}[];

export const fetchVisaTypes = async (entity: fetchVisaTypesPayload) => {
    const body = {
        id: entity.tour_id,
        document_type_id: entity.form.document_type_id,
    };

    return await http<fetchVisaTypesResponse>('tour/list_service_visa', {
        body,
        method: 'post',
    });
};
