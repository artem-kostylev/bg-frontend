import type { Image, Location } from "@/app/types";
import type { Hotel } from "@/hotels/types";

export type Tour = {
    hotel: Hotel;
    price: number;
    flight_included: boolean;
    instant_booking: boolean;
    transfer_included: boolean;
    insurance_included: boolean;
    excursion_included: boolean;
};

export type TourType = "classic" | "hotel" | "package";

export type TourPackage = {
    id: number;
    name: string;
    price: number;
    images: Image[];
    location: Location[];
    flight_included: boolean;
    instant_booking: boolean;
    transfer_included: boolean;
    excursion_included: boolean;
    insurance_included: boolean;
};
