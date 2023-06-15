export const parseTickets = (arr: string[]) => {
    return arr.map(variant => {
        const arr = variant.split('$');
        const [, id] = arr[0].split(':');

        const result = { id: Number(id), ticket: [] as Record<string, number | string>[] };

        for (let i = 1; i < arr.length; i++) {
            const [price_type, value] = arr[i].split(':');
            result.ticket.push({ price_type, qty: Number(value) });
        }

        return result;
    });
};
