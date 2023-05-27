export const formatFood = (food: { name: string }[]) => {
    return food.map(item => item.name).join(', ');
};
