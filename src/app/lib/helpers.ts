/**
 *  Проверяет наличие ключей в обьекте
 * @example hasKeys({ id: 1 }, ['id', 'name']) // false
 */
export const hasKeys = (obj: Object, arr: string[]) => {
    const keys = Object.keys(obj);
    return arr.every(key => keys.includes(key));
};
