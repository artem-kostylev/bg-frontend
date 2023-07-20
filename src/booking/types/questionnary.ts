import type { FetchAvailableDocumentsResponse } from '@/booking/services';

export type QuestionnaryForm = {
    id: number;
    first_name: string;
    last_name: string;
    second_name: string;
    birthday: string;
    sex: string;
    service_insurance_id: number;
    nationality_id: number;
    document_type_id: number;
    document_number: string;
    document_series: string;
    document_till: string;
    phone: string;
    email: string;
};

export type Questionnary = {
    label: string;
    form: Partial<QuestionnaryForm>;
    tour_id: string;
    availableDocuments?: FetchAvailableDocumentsResponse | null;
    countyIds?: number[];
};
