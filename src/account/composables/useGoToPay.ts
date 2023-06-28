import { useRouter } from '#imports';

export const useGoToPay = ({ orderId, optionKey }: { orderId: number; optionKey?: string }) => {
    const router = useRouter();

    const pay = (key?: string) => {
        router.push({
            name: 'booking-pay',
            query: { order_id: orderId, selected_option: key ? key : optionKey },
        });
    };

    return {
        pay,
    };
};
