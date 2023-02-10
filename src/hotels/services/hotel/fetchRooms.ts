import { http } from "@/app/lib";
import { Room } from "@/hotels/types";

type Group = {
    rooms: Room[];
};

type FetchRoomsResponse = {
    groups: Group[];
};

export const fetchRooms = (id: string) => {
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
     */

    return http<FetchRoomsResponse>(`tour/hotel/${id}/rooms`, {
        method: "POST",
        version: 2,
        body: {
            tour_type: "classic",
            accommodations_unikey: [[], []],
            filters: {
                "component.components.type": ["accommodation", "movement"],
                "tour.is_multi_living": false,
                tour_from: 260,
                tour_tourists: [
                    { adults: [36, 36], children: [], pet: false },
                    { adults: [36, 36], children: [], pet: false },
                ],
            },
        },
    });
};
