/**
 *  Проверяет наличие ключей в обьекте
 * @example hasKeys({ id: 1 }, ['id', 'name']) // false
 */
export const hasKeys = (obj: Object, arr: string[]) => {
    const keys = Object.keys(obj);
    return arr.every(key => keys.includes(key));
};

/**
 *  Форматирует число
 * @example formatNumber(1000) // 1 000
 */
export const formatNumber = (num: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat("ru-RU", options).format(num);
};

/**
 *  Форматирует валюту
 * @example formatCurrency(1000) // 1 000
 */
export const formatCurrency = (num: number, currency = "RUB") => {
    return formatNumber(num, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    });
};

/**
 *  Форматирует дату
 * @example formatDate('2023-04-30', 'month:short|day:numeric') // 30.04.2023
 */
export const formatDate = (date: string | number, format?: string) => {
    const options: Record<string, string> = {};

    format?.split("|").forEach(option => {
        const [key, value] = option.split(":");
        options[key] = value;
    });

    return new Intl.DateTimeFormat("ru-RU", options).format(new Date(date));
};

/**
 *  Форматирует массив строк в дату
 * @example formatDate(['2023-04-30', '2023-04-31']) // 30.04.2023 - 31.04.2023
 */
export const formatDates = (dates: string[], separator: string = " - ", format?: string) => {
    return dates.map(date => formatDate(date, format)).join(separator);
};

// TODO: Добавить пример
export const formatList = (list: string[]) => {
    return new Intl.ListFormat("ru-RU", { style: "long", type: "conjunction" }).format(list);
};

// TODO: Добавить пример
export const pluralize = (count: number | string, words: string[]) => {
    if (typeof count === "string") count = +count;

    const cases = [2, 0, 1, 1, 1, 2];
    return (
        count +
        " " +
        words[count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]]
    );
};

// TODO: Добавить пример
export const formatDistance = (distance: number) => {
    return distance < 1000 ? `${distance} м` : `${Math.round(distance / 1000)} км`;
};
