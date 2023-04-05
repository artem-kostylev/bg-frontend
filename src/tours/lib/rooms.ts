import type { AvailableDate, AvailableDateItem } from "@/tours/types";

export type MergedSelectedDateItem = Omit<AvailableDateItem, "accommodation_unikey"> & {
    accommodation_unikey: string[][];
};

export type MergedSelectedDate = {
    begin_date: string;
    items: MergedSelectedDateItem[];
    existingItems: {
        [key: string]: {
            accommodation_unikey: string[][];
            begin_date: [string, string];
            price: number;
        };
    };
};

export const mergeSelectedDates = (selectedDates: AvailableDate[][]) => {
    const mergedDates: { [key: string]: MergedSelectedDate } = {};

    selectedDates.forEach((dates, index) => {
        for (const date of dates) {
            if (!mergedDates[date.begin_date]) {
                mergedDates[date.begin_date] = {
                    begin_date: date.begin_date,
                    items: [],
                    existingItems: {},
                };
            }

            for (const item of date.items) {
                const key = item.begin_date.join("-");
                const existingItem = mergedDates[date.begin_date].existingItems[key];
                if (existingItem) {
                    existingItem.price += item.price;
                    !existingItem.accommodation_unikey[index] &&
                        (existingItem.accommodation_unikey[index] = []);
                    existingItem.accommodation_unikey[index].push(item.accommodation_unikey);
                } else {
                    mergedDates[date.begin_date].items.push({
                        ...item,
                        accommodation_unikey: [[item.accommodation_unikey]],
                    });
                    mergedDates[date.begin_date].existingItems[key] =
                        mergedDates[date.begin_date].items[
                            mergedDates[date.begin_date].items.length - 1
                        ];
                }
            }
        }
    });

    const result = Object.values(mergedDates).filter(date => {
        if (selectedDates.length > 1) {
            date.items = date.items.filter(item => item.accommodation_unikey.length > 1);
        }

        return date.items.length > 0;
    });

    return result;
};