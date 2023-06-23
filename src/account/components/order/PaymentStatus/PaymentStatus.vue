<script setup lang="ts">
import { computed } from 'vue';
import { Button } from '@ui/components';
import { PaymentCard } from '@/account/components';
import type { PaymentProcedureOptions } from '@/booking/types';
import { formatCurrency } from '@/app/lib';
import { useParams } from '@/app/composables';
import { useRouter } from '#imports';

type Props = {
    options: PaymentProcedureOptions;
    paymentDefermentInDays: number;
    status: 'fully_paid' | 'partially_paid' | 'not_paid';
};

const props = defineProps<Props>();

const params = useParams<{ id: number }>();

const router = useRouter();

const pay = (optionKey: string) => {
    router.push({
        name: 'booking-pay',
        query: { order_id: params.value.id, selected_option: optionKey },
    });
};

const paymentOptions = computed(() => {
    if (props.status !== 'not_paid') {
        return props.options.slice(0, 2);
    }

    return props.options;
});
</script>

<template>
    <div>
        <div class="flex flex-wrap sm:flex-nowrap gap-2.5 mt-6">
            <div
                v-for="option in paymentOptions"
                :key="option.key"
                class="w-full md:w-1/2 lg:w-1/3 md:px-2 h-52"
            >
                <PaymentCard :option="option" class="h-full" />
            </div>
        </div>
        <div v-if="paymentDefermentInDays" class="mt-8">
            * – При изменении статуса заявки на «Подтверждено» Вы должны произвести полную оплату
            турпродукта / туристской услуги, не позднее {{ paymentDefermentInDays }} дней до начала
            тура.
        </div>
        <div
            v-if="status !== 'not_paid' && options.length > 2"
            class="flex flex-col text-left mt-10 lg:mt-5"
        >
            <div>
                Оплатить
                <span class="font-bold">{{
                    formatCurrency(options[options.length - 1].paymentAmount, true)
                }}</span>
                <span>
                    ({{ options[options.length - 1].percent }}% от стоимости тура) – весь остаток до
                    полной стоимости тура.</span
                >
            </div>
            <Button
                variant="primary"
                class="mt-4 w-full sm:w-max"
                @click="pay(options[options.length - 1].key)"
            >
                Оплатить
            </Button>
        </div>
    </div>
</template>
