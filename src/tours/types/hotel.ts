import type { Image, Location } from "@/app/types";

export type Hotel = {
    id: number;
    name: string;
    stars?: number;
    rating: number;
    reviews: number;
    images: Image[];
    location: Location[];
};
