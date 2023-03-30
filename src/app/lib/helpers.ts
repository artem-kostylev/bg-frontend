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
 *  Форматирует строку в дату
 * @example formatDate('2023-04-30') // 30.04.2023
 */
export const formatDate = (date: string, options?: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat("ru-RU", options).format(new Date(date));
};

/**
 *  Форматирует массив строк в дату
 * @example formatDate(['2023-04-30', '2023-04-31']) // ['30.04.2023', '31.04.2023']
 */
export const formatDates = (
    dates: string[],
    separator: string = " - ",
    options?: Intl.DateTimeFormatOptions
) => {
    return dates.map(date => formatDate(date, options)).join(separator);
};
