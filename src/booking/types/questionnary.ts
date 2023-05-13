export type QuestionnaryForm = {
    first_name: string;
    last_name: string;
    birthday: string;
    sex: string;
    service_insurance_id: number;
};

export type Questionnary = {
    label: string;
    form: Partial<QuestionnaryForm>;
    tour_id: string;
};
