export type Insurance = {
    id: number;
    name: string;
    price: number;
    description: { sum: number | string; currency: string };
};
