import { http } from '@/app/lib/http';

export type FetchAvailableDocumentsResponse = {
    nationality_id: number;
    nationality_name: string;
    documents: {
        days_before_expires: number;
        id: number;
        is_cyrillic: boolean;
        is_visa: boolean;
        max_age: number;
        min_age: number;
        name: string;
        template: string[];
    }[];
}[];

export const fetchAvailableDocuments = async (ids: number[]) => {
    return await http<FetchAvailableDocumentsResponse>('tour/available_documents', {
        body: { ids },
        method: 'POST',
    });
};
