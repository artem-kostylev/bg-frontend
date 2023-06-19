export type PayQuery = {
    order_id: number;
    order_payment_id?: number;
    status?: 'success' | 'fail';
};

export type PaymentOption = {
    percent: number;
    paymentAmount: number;
    paymentDefermentInDays: number;
};

export type PaymentOptions = {
    [key: string]: PaymentOption;
};

export type PaymentStatus = {
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
