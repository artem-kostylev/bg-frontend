<script setup lang="ts">
import { Button } from "@ui/components";
import type { Transfer } from "@/booking/types";
import { TransferBox } from "@/booking/components";
import { formatCurrency } from "@/app/lib";

type Props = {
    additionalTransfer: Transfer;
    transfer: Transfer;
};

const props = defineProps<Props>();

const select = () => {
    Object.assign(props.transfer, props.additionalTransfer);
};
</script>

<template>
    <TransferBox :transfer="additionalTransfer">
        <template #footer>
            <Button @click="select">+ {{ formatCurrency(additionalTransfer.price) }}</Button>
        </template>
    </TransferBox>
</template>
