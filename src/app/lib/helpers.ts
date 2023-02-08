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
