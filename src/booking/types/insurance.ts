export type Insurance = {
    id: number;
    name: string;
    price: number;
    description: { sum: number; currency: string };
};
