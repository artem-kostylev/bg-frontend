import type { Hotel } from "@/hotels/types";

export type Tour = {
    hotel: Hotel;
    price: number;
    excursion_included: boolean;
    flight_included: boolean;
    instant_booking: boolean;
    insurance_included: boolean;
    transfer_included: boolean;
};
