export interface Room {
    id: number;
    name: string;
    board: string;
    tourists: string[];
    group_id?: number;
}

export type AccommodationStatus =
    | {
          description: 'Подбор тура';
          key_name: 'TOUR_SELECTION';
          value: 1;
      }
    | {
          description: 'Бронирование';
          key_name: 'RESERVATION';
          value: 2;
      }
    | {
          description: 'Подтверждено';
          key_name: 'CONFIRMED';
          value: 3;
      }
    | {
          description: 'Не подтверждено';
          key_name: 'NOT_CONFIRMED';
          value: 4;
      }
    | {
          description: 'Без проживания';
          key_name: 'NO_ACCOMMODATION';
          value: 5;
      }
    | {
          description: 'Аннуляция';
          key_name: 'CANCELLATION';
          value: 6;
      }
    | {
          description: 'Аннулировано';
          key_name: 'CANCELED';
          value: 7;
      };

export type AccommodationRoom = Room & {
    accommodation_unikey: string;
    order_accommodation_id: number;
    view: string[];
    wishes: string[] | null;
    status?: AccommodationStatus;
};

export type Accommodation = {
    id: number;
    duration: number;
    hash_rooms: string;
    date_start: string;
    date_finish: string;
    name: string;
    rooms: AccommodationRoom[];
    location: { id: number; name: string; visa: boolean }[];
    has_review?: boolean;
};
