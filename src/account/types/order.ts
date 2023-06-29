export type ChartAmounts = {
    minPrice: {
        amount: number;
        percent: number;
    };
    totalPrice: {
        amount: number;
        percent: number;
    };
    paid?: {
        amount: number;
        percent: number;
    };
};

export type OrderPaymentChart = {
    amounts: ChartAmounts;
    paymentOptionsLength: number;
};
