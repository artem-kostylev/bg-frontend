<script setup lang="ts">
import { watch, ref, onBeforeUnmount } from 'vue';
import { useLazyAsyncData, clearNuxtData, useName } from '#imports';
import { Button, Modal } from '@ui/components';
import { PencilIcon } from '@ui/icons';
import type { Transfer } from '@/booking/types';
import { fetchTransfer } from '@/booking/services';
import { AdditionalTransferList, TransferBox } from '@/booking/components';

type Props = {
    transfer: Transfer;
};

const props = defineProps<Props>();

const name = useName<'booking-composition' | 'booking-confirmation'>();

const { data, pending, execute } = useLazyAsyncData(
    `transfer-${props.transfer.id}`,
    () => fetchTransfer(props.transfer),
    { immediate: false }
);

const show = ref(false);

const open = () => !data.value && execute();

watch(
    () => props.transfer,
    () => (show.value = false),
    { deep: true }
);

onBeforeUnmount(() => clearNuxtData(`transfer-${props.transfer.id}`));
</script>

<template>
    <TransferBox :transfer="transfer">
        <template v-if="name === 'booking-composition'" #footer>
            <Modal
                v-model="show"
                title="Изменить трансфер"
                size="3xl"
                :loading="pending"
                @open="open"
            >
                <template #trigger="{ vbind }">
                    <Button
                        v-bind="vbind"
                        :start-icon="PencilIcon"
                        :disabled="!transfer.has_additional"
                    >
                        Изменить
                    </Button>
                </template>
                <AdditionalTransferList
                    v-if="data"
                    :transfer="transfer"
                    :additional-transfers="data.allowed"
                />
            </Modal>
        </template>
    </TransferBox>
</template>
