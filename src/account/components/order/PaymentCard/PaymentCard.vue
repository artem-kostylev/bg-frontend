<script setup lang="ts">
import { Card, Button } from '@ui/components';
import { CheckIcon, CrossInCircleIcon } from '@ui/icons';
import type { PaymentProcedureOption } from '@/booking/types';
import { formatCurrency } from '@/app/lib';
import { useParams } from '@/app/composables';
import { useRouter } from '#imports';

type Props = {
    option: PaymentProcedureOption;
};

const props = defineProps<Props>();

const params = useParams<{ id: number }>();

const router = useRouter();

const pay = () => {
    router.push({
        name: 'booking-pay',
        query: { order_id: params.value.id, selected_option: props.option.key },
    });
};
</script>

<template>
    <Card
        header-class="!p-0"
        :body-class="
            option.status === 'paid' && 'border-2 border-[#B5DFB4] border-solid rounded-xl'
        "
    >
        <template #header
            ><div class="relative" :style="{ padding: 0 }">
                <div v-if="option.status === 'paid'" class="absolute top-0 px-4 text-sm">
                    <div
                        class="flex items-center space-x-2.5 bg-[#B5DFB4] px-3 py-1.5 text-black rounded-b-md"
                    >
                        <CheckIcon width="1em" height="1em" />
                        <span>Оплачено</span>
                    </div>
                </div>
                <div v-else class="absolute top-0 px-4 text-sm">
                    <div
                        class="flex items-center space-x-2.5 bg-warning-600 px-3 py-1.5 text-white rounded-b-md"
                    >
                        <CrossInCircleIcon width="1em" height="1em" />
                        <span>Не оплачено</span>
                    </div>
                </div>
            </div>
        </template>
        <div class="flex flex-col p-5 justify-center items-center mt-7">
            <div class="text-3xl">
                {{ formatCurrency(option.paymentAmount, true) }}
                <span v-if="option.important"> * </span>
            </div>
            <div class="mt-1 text-secondary-500 text-center">
                <span>{{ option.percent }}% {{ option.label }}</span>
            </div>
            <div class="mb-3 w-full sm:w-max">
                <Button
                    v-if="option.status === 'not_paid'"
                    variant="primary"
                    class="mt-3 w-full sm:w-max"
                    @click="pay"
                >
                    Оплатить
                </Button>
            </div>
        </div>
    </Card>
</template>
