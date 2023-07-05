export type Document = {
    birthday: string;
    created_at: string;
    deleted_at: string | null;
    document_number: string;
    document_series: string | null;
    document_till: string;
    document_type: {
        created_at: string | null;
        deleted_at: string | null;
        id: number;
        is_cyrillic: boolean;
        limitations: {};
        name: string;
        nationality_id: number;
        template: string[];
        updated_at: string | null;
    };
    document_type_id: number;
    document_type_name: string;
    email: string;
    first_name: string;
    id: number;
    name: string;
    last_name: string;
    nationality_id: number;
    phone: string;
    second_name: string;
    sex: 'female' | 'male';
    updated_at: string;
    user_id: number;
};

export type UpperCaseKeys = {
    first_name: string;
    last_name: string;
    second_name: string;
};

export type NewDocument = UpperCaseKeys & {
    birthday: string;
    sex: 'female' | 'male' | null;
    nationality_id: number | null;
    document_type_id: number | null;
    document_number: string;
    document_series?: string | null;
    document_till: string;
    phone: string;
    email: string;
};

export type Nationality = {
    created_at: string | null;
    deleted_at: string | null;
    id: number;
    name: string;
    updated_at: string | null;
    nationality_id: number;
    nationality_name: string;
};

export type DocType = {
    created_at: string | null;
    deleted_at: string | null;
    id: number;
    is_cyrillic: boolean;
    limitations: { min_age?: number; max_age?: number };
    name: string;
    nationality_id: number;
    template: string[];
    updated_at: null;
};
