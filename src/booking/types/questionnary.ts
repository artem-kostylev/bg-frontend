export type QuestionnaryForm = {
    first_name?: string;
    last_name?: string;
    service_insurance_id?: number;
};

export type Questionnary = {
    label: string;
    form: QuestionnaryForm;
    tour_id: string;
};
