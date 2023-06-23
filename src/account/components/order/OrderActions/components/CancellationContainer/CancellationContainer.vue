<script setup lang="ts">
import { ref } from 'vue';
import { Modal, Button } from '@ui/components';
import { CrossInCircleIcon } from '@ui/icons';
import { Cancellation } from '../';

type Props = {
    orderId: number;
};

defineProps<Props>();

const show = ref(false);

const close = () => {
    show.value = false;
};
</script>

<template>
    <Modal v-model="show" size="md" title="Аннулирование заказа">
        <template #trigger="{ vbind }">
            <Button
                v-bind="vbind"
                :start-icon="CrossInCircleIcon"
                variant="secondary"
                icon-class="w-5 h-5"
                class="w-full sm:w-max"
            >
                Аннулировать заказ
            </Button>
        </template>
        <Cancellation :order-id="orderId" @close="close" />
    </Modal>
</template>
