import type { Document } from '@/account/types';
import { formatDate } from '@/app/lib';

export const formatDocuments = (documents: Document[]) => {
    documents.forEach(document => {
        document.name = document.last_name + ' ' + document.first_name.charAt(0) + '. ';

        if (document.second_name) {
            document.name += document.second_name.charAt(0) + '.';
        }

        if (document.document_type) {
            document.document_type_name = document.document_type.name;
            document.document_type_id = document.document_type.id;
        }

        if (document.birthday) {
            document.birthday = formatDate(document.birthday, 'DD.MM.YYYY');
        }

        if (document.document_till) {
            document.document_till = formatDate(document.document_till, 'DD.MM.YYYY');
        }

        if (document.document_series?.length) {
            document.document_number = document.document_series + ' ' + document.document_number;
        }
    });

    return documents;
};
