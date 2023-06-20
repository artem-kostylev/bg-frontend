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

export type OrderPaymentStatus = {
    prepaymentStatus: {
        money: 'notPayed' | 'lessThanMinimal' | 'moreOrEqualThanMinimal';
        defermentInDaysDeadline: 'before' | 'after';
    };
    mustPayedToFullCost?: { amount: number; percent: number };
    mustPayedToMinimal?: { amount: number; percent: number };
    payedToFullCost?: { amount: number; percent: number };
    payedToMinimal?: { amount: number; percent: number };
};

export type Transaction = {
    url: string | null;
    id: number;
    ticket: string;
    amount: number;
    status: 'ok' | 'failed' | 'created';
    result_code: string | null;
    qr_code: string | null;
};

export type PaymentProcedureOptions = {
    key: string;
    percent: number;
    paymentAmount: number;
    label: string;
    important: boolean;
}[];
