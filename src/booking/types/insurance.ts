export type Insurance = {
    id: number;
    name: string;
    description: { sum: number; currency: string };
    price?: number;
    tourist?: string;
};
