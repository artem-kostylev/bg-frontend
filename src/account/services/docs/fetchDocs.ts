import { http } from "@/app/lib";
import { Document } from "@/account/types";

type FetchAccountResponse = {
    data: Document[];
};

export const fetchDocuments = async () => {
    const { data } = await http<FetchAccountResponse>("tourists_documents/list");
    return data;
};
