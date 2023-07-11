export type Transfer = {
    capacity: number;
    date: string;
    from: string;
    id: number;
    name: string;
    route: string;
    to: string;
    type: string;
    vehicle: string;
    description?: string;
    has_additional?: boolean;
    price?: number;
};

export type AdditionalTransfer = Transfer & { price: number };
