import { http } from "@/app/lib";
import type { Document } from "@/account/types";

type FetchDocumentsResponse = {
    data: Document[];
};

export const fetchDocuments = async (ids: number[]) => {
    const { data } = await http<FetchDocumentsResponse>("tourists_documents/list", {
        method: "POST",
        body: { ids },
    });

    return data;
};
