import { http, formatDate } from '@/app/lib';
import type { Document } from '@/account/types';

type FetchAccountResponse = {
    data: Document[];
};

export const fetchDocuments = async () => {
    const { data } = await http<FetchAccountResponse>('tourists_documents/list');

    data.forEach(doc => {
        doc.name = doc.last_name + ' ' + doc.first_name.charAt(0) + '. ';

        if (doc.second_name) {
            doc.name += doc.second_name.charAt(0) + '.';
        }

        if (doc.document_type) {
            doc.document_type_name = doc.document_type.name;
            doc.document_type_id = doc.document_type.id;
        }

        if (doc.birthday) {
            doc.birthday = formatDate(doc.birthday, 'DD.MM.YYYY');
        }

        if (doc.document_till) {
            doc.document_till = formatDate(doc.document_till, 'DD.MM.YYYY');
        }
    });
    return data;
};
