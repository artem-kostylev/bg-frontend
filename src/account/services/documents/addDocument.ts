import { http } from '@/app/lib';
import type { NewDocument, Document } from '@/account/types';

export type addDocumentResponse = {
    data: Document;
};

export const addDocument = async (form: NewDocument | Document) => {
    const result = await http<addDocumentResponse>('tourists_documents', {
        body: form,
        method: 'POST',
    });
    return result.data;
};
