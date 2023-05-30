export const formatFood = (food: { name: string }[]) => {
    return food.map(item => item.name).join(', ');
};

export const parseSort = (sortRaw: string) => {
    const [key, value] = sortRaw.split(':');

    return { [key]: { order: value } };
};
