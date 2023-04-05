import type { Image, Location } from "@/app/types";

export type TourPackage = {
    id: number;
    name: string;
    price: number;
    images: Image[];
    location: Location[];
    description?: string;
    flight_included?: boolean;
    instant_booking?: boolean;
    transfer_included?: boolean;
    excursion_included?: boolean;
    insurance_included?: boolean;
};
