export type PayQuery = {
    order_id: number;
    order_payment_id?: number;
    status?: 'success' | 'fail';
    selected_option?: string;
};

export type OrderPaymentOption = {
    percent: number;
    paymentAmount: number;
    paymentDefermentInDays: number;
};

export type OrderPaymentOptions = {
    [key: string]: OrderPaymentOption;
};

export type PrepaymentStatus = {
    money: 'notPayed' | 'lessThanMinimal' | 'moreOrEqualThanMinimal';
    defermentInDaysDeadline: 'before' | 'after';
};

export type PrepaymentDetail = {
    mustPayedToFullCost?: { amount: number; percent: number };
    mustPayedToMinimal?: { amount: number; percent: number };
    payedToFullCost?: { amount: number; percent: number };
    payedToMinimal?: { amount: number; percent: number };
};

export type OrderPaymentDetail = { prepaymentStatus: PrepaymentStatus } & PrepaymentDetail;

export type Transaction = {
    url: string | null;
    id: number;
    ticket: number;
    amount: number;
    status: 'ok' | 'failed' | 'created';
    result_code: string | null;
    qr_code: string | null;
};

export type PaymentProcedureOption = {
    percent: number;
    paymentAmount: number;
    key: string;
    label: string;
    important: boolean;
    status: 'paid' | 'not_paid';
    option?: keyof PrepaymentDetail;
};

export type PaymentProcedureOptions = PaymentProcedureOption[];
