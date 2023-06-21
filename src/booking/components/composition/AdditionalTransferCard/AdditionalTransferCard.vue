<script setup lang="ts">
import { Button } from '@ui/components';
import type { Transfer, AdditionalTransfer } from '@/booking/types';
import { TransferBox } from '@/booking/components';
import { formatCurrency } from '@/app/lib';
import { computed } from 'vue';

type Props = {
    additionalTransfer: AdditionalTransfer;
    transfer: Transfer;
};

const props = defineProps<Props>();

const selected = computed(() => props.transfer.id === props.additionalTransfer.id);

const select = () => {
    Object.assign(props.transfer, props.additionalTransfer);
};

const price = computed(() => {
    const { additionalTransfer, transfer } = props;

    if (selected.value) {
        const label = additionalTransfer.price ? '' : 'В составе - ';
        return `${label}${formatCurrency(additionalTransfer.price)}`;
    }

    if (!transfer.price) return `+ ${formatCurrency(additionalTransfer.price)}`;

    const diff = additionalTransfer.price - transfer.price;
    return diff > 0 ? `+ ${formatCurrency(diff)}` : `- ${formatCurrency(diff * -1)}`;
});
</script>

<template>
    <TransferBox
        :transfer="additionalTransfer"
        :show-name="false"
        :class="['border-2', selected ? 'border-success-600' : 'border-transparent']"
    >
        <template #footer>
            <Button @click="select" :disabled="selected" :variant="selected ? 'base' : 'primary'">
                {{ price }}
            </Button>
        </template>
    </TransferBox>
</template>
