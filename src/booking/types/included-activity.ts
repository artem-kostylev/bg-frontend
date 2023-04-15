import type { AllActivity } from "@/booking/types";

export type IncludedActivity = {
    price: number;
    icons: string[];
    tour_id: string[];
    tour_name: string;
    all_activities: AllActivity[];
    tour_description: string;
};
