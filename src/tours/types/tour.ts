import type { Hotel } from "@/tours/types";

export type Tour = {
    hotel: Hotel;
    price: number;
    flight_included?: boolean;
    instant_booking?: boolean;
    transfer_included?: boolean;
    insurance_included?: boolean;
    excursion_included?: boolean;
};

export type TourType = "hotel" | "package";
