import type { PaymentOptions } from '@/booking/types';

export type GroupTourist = {
    description: string;
    min: string;
    max: string;
};

export type Group = {
    tour_id: string;
    id: number;
    tourists: GroupTourist[];
};

export type CommonGeneral = {
    date_finish: string;
    date_start: string;
    duration: number;
    from: string;
    qty_tourists: number;
    total_price: number;
};

export type General = CommonGeneral & { groups: Group[] };

export type OrderDetailGeneral = CommonGeneral & {
    tourists: string[];
    order_id: number;
    order_number: number;
    order_status: string;
    support_id: number | null;
    order_can_been_annulled: boolean;
    payment_options: PaymentOptions;
};
