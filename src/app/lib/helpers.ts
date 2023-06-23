import dayjs from 'dayjs';
import { Mask } from 'maska';

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
    return new Intl.NumberFormat('ru-RU', options).format(num);
};

/**
 *  Форматирует валюту
 * @example formatCurrency(1000) // 1 000
 */
export const formatCurrency = (num: number | string, isPennies = false, currency = 'RUB') => {
    currency === 'RUR' && (currency = 'RUB');

    // TODO: Сделать чтобы везде с бэкенда приходили суммы в копейках
    /* isPennies - флаг, показывающий, что сумма передана в копейках, необходимо отбросить копейки */
    isPennies && (num = Math.floor(Number(num) / 100));

    return formatNumber(+num, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    });
};

/**
 *  Форматирует дату
 * @example formatDate('2023-04-30', 'DD.MM.YYYY') // 30.04.2023
 */
export const formatDate = (date: string | number, format?: string) => {
    return dayjs(date).format(format);
};

/**
 *  Форматирует массив строк в дату
 * @example formatDate(['2023-04-30', '2023-04-31']) // 30.04.2023 - 31.04.2023
 */
export const formatDates = (dates: string[], separator: string = ' - ', format?: string) => {
    return dates.map(date => formatDate(date, format)).join(separator);
};

// TODO: Добавить пример
export const formatList = (list: string[]) => {
    return new Intl.ListFormat('ru-RU', { style: 'long', type: 'conjunction' }).format(list);
};

// TODO: Добавить пример
export const pluralize = (count: number | string, words: string[]) => {
    if (typeof count === 'string') count = +count;

    const cases = [2, 0, 1, 1, 1, 2];
    return (
        count +
        ' ' +
        words[count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]]
    );
};

// TODO: Добавить пример
export const formatDistance = (distance: number) => {
    return distance < 1000 ? `${distance} м` : `${Math.round(distance / 1000)} км`;
};

export const formatMinutes = (duration: number) => {
    const days = Math.floor(duration / 1440);
    const hours = Math.floor((duration % 1440) / 60);
    const minutes = duration % 60;

    return `${days ? `${days}д` : ''} ${hours ? `${hours}ч ` : ''}${minutes ? `${minutes}м` : ''}`;
};

/**
 *  Преобразует первую букву каждого слова в тексте в верхний регистр
 *  // TODO: Добавить пример
 */
export const textTransform = (text: string) => {
    const textArr = text.toLowerCase().split(' ');

    for (let i = 0; i < textArr.length; i++) {
        textArr[i] = textArr[i].charAt(0).toUpperCase() + textArr[i].slice(1);
    }

    return textArr.join(' ');
};

/**
 *  Удаляет ключи формы с пустыми значениями
 *  // TODO: Добавить пример
 */
export const removeEmptyKeys = (form: { [key: string]: string }) => {
    return Object.entries(form).reduce(
        (a: { [key: string]: string }, [k, v]) => (v === '' ? a : ((a[k] = v), a)),
        {}
    );
};

export const phoneMask = new Mask({ mask: '+7 (###) ### ## ##' });

/**
 *  Форматирует номер телефона в набор цифр, начинающийся с 7
 *  @example unmaskPhone('+7 (999) 999 99 99') // 79999999999
 */
export const unmaskPhone = (phone: string) => {
    return '7' + phoneMask.unmasked(phone);
};
