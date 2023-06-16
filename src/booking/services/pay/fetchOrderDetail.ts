import { http } from '@/app/lib';
import type {
    OrderDetailGeneral,
    Accommodation,
    Movement,
    Insurance,
    Transfer,
    ExtraActivity,
    PaymentStatus,
} from '@/booking/types';

export type FetchOrderDetailResponse = {
    general: OrderDetailGeneral;
    accommodations: Accommodation[];
    movements: Movement[];
    insurances: Insurance[];
    transfers: Transfer[];
    activities: ExtraActivity[];
    payment_status: PaymentStatus;
};

export type FetchOrderDetailQuery = {
    order_id: number;
};

export const fetchOrderDetail = async (order_id: number) => {
    // TODO: Возвращать из бэка general.tourists и accommodation.rooms.tourists как string[]
    // TODO: Возвращать из бэка insurance.description как { sum: number; currency: string }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await http<any>('order/detail', {
        method: 'POST',
        body: { order_id },
    });

    response.general.tourists = response.general.tourists.map(
        (tourist: { fullname: string; age: number }) => tourist.fullname
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response.accommodations.forEach((accommodation: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        accommodation.rooms.forEach((room: any) => {
            room.tourists = room.tourists.map(
                (tourist: { fullname: string; age: number }) => tourist.fullname
            );
        });
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response.insurances.forEach((insurance: any) => {
        const regex = /(\d[\d ]+)\s*(\w+)/;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, sum, currency] = insurance.description.match(regex) ?? [];

        insurance.description = {
            sum: sum?.replace(/\s/g, '') ?? '',
            currency: currency ?? '',
        };
    });

    return response as FetchOrderDetailResponse;
};
