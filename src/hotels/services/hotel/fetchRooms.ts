import { http } from "@/app/lib";
import type { Filters } from "@/tours/types/filters";
import type { Room } from "@/hotels/types";
import type { TourType } from "@/tours/types";

type Group = {
    rooms: Room[];
};

type FetchRoomsResponse = {
    groups: Group[];
};

export type FetchRoomsQuery = Filters & { tour_type: TourType };

export const fetchRooms = (id: string, query: FetchRoomsQuery) => {
    /**
     * TODO: Вынести даты для каждого типа питания в отдельный endpoint
     */

    /**
     * Рассмотреть вариант присылать нужную группу комнат по запросу
     */

    /**
     * filtes - component.components.type и tour.is_multi_living
     * Убрать из filters так как они не относится к фильтру сайта
     * и могут создать проблему при сравнивание обьектов фильтра урла и того что пришло с бэка
     */

    /**
     * accommodations_unikey: [[]] костыль
     * Если не передается этот параметр
     * заполнять можно вот так - new Array(tour_tourists.length).fill([])
     */

    const { tour_type, filters } = query;

    return http<FetchRoomsResponse>(`tour/hotel/${id}/rooms`, {
        method: "POST",
        version: 2,
        body: {
            tour_type,
            accommodations_unikey: [[], []],
            filters,
        },
    });
};
