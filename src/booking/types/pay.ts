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
};
